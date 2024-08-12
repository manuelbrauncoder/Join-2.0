import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SubTask, Task } from '../models/task.class';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { InitialsPipe } from '../pipes/initials.pipe';
import { User } from '../models/user.class';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InitialsPipe],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
})
export class AddTaskFormComponent {
  taskService = inject(TaskService);
  userService = inject(UserService);
  task = new Task();
  dueDate: Date | null = null;
  subTaskInput: string = ''; // input for new subtasks
  subTaskEditInput: string = '';
  searchUserInput: string = '';
  @Input() openInDialog: boolean = false;
  @Output() dialogOpen = new EventEmitter<boolean>();

  editingSubtaskIndex: number | null = null; // if null, editmode not showing

  taskCategoryOptions: boolean = false;
  userOptions: boolean = false;
  showCategoryHint: boolean = false;

  constructor() {
    this.task.category = '';
  }

  closeDialog(value: boolean){
    this.dialogOpen.emit(value);
  }

  /**
   * 
   * @returns all users, or filtered user
   */
  filteredUsers(): User[] {
    if (!this.searchUserInput) {
      return this.userService.fireService.users;
    }
    return this.userService.fireService.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchUserInput)
    );
  }

  /**
   * open edit mode for subtasks
   * push title as value in input field
   * @param index 
   */
  openSubtaskEditMode(index: number){
    this.editingSubtaskIndex = index;
    this.subTaskEditInput = this.task.subtasks[index].title;    
  }

  /**
   * save the edited subtask
   * and close edit field; null = not showing
   * @param index 
   */
  saveEditedSubtask(index: number){
    this.task.subtasks[index].title = this.subTaskEditInput;
    this.editingSubtaskIndex = null;
  }

  /**
   * delete subtask with index
   * @param index 
   */
  deleteSubtask(index: number){
    this.task.subtasks.splice(index, 1);
    this.editingSubtaskIndex = null;
  }

  /**
   * toggle options for user to asign
   */
  toggleUserOptions() {
    this.userOptions = !this.userOptions;
  }

  /**
   * show user options
   */
  showUserOptions() {
    this.userOptions = true;
  }

  /**
   * toggle options for category
   */
  toggleCategoryOptions() {
    this.taskCategoryOptions = !this.taskCategoryOptions;
    this.showCategoryHint = true;
  }

  /**
   * clear form
   */
  clearAllInputs() {
    this.task.title = '';
    this.task.description = '';
    this.task.dueDate = 0;
    this.task.priority = 'medium';
    this.clearSubtaskInput();
    this.task.subtasks = [];
    this.task.assignedTo = [];
    this.task.category = '';
  }

  /**
   * clearSubtaskInput
   */
  clearSubtaskInput() {
    this.subTaskInput = '';
  }

  /**
   * add subtask to task.subtasks
   * clear input
   */
  addSubtask() {
    let subtask = new SubTask({ title: this.subTaskInput, done: 'false' });
    this.task.subtasks.push(subtask);
    this.subTaskInput = '';
  }

  /**
   * push selected user to task.assignedTo
   * @param user
   */
  asignUserToTask(user: string) {
    if (!this.task.assignedTo.includes(user)) {
      this.task.assignedTo.push(user);
    } else {
      let index = this.task.assignedTo.indexOf(user);
      this.task.assignedTo.splice(index, 1);
    }
  }

  /**
   * 
   * @param user 
   * @returns true if user is assigned to task
   */
  isUserChecked(user: string) {
    return this.task.assignedTo.includes(user);
  }

  /**
   * changes the priority of the task
   * @param prio 
   */
  changeTaskPrio(prio: 'urgent' | 'medium' | 'low') {
    this.task.priority = prio;
  }

  /**
   * change the task category
   * @param cat
   */
  changeTaskCategory(cat: 'User Story' | 'Technical Task') {
    this.task.category = cat;
    this.taskCategoryOptions = false;
  }

  /**
   * save date as timestamp, handle wrong format
   */
  handleDueDate() {
    if (this.dueDate) {
      const date =
        typeof this.dueDate === 'string'
          ? new Date(this.dueDate)
          : this.dueDate;
      const timestamp = date.getTime();

      if (!isNaN(timestamp)) {
        this.task.dueDate = timestamp;
      } else {
        console.error('Invalid due date');
      }
    }
  }

  /**
   * save Task in firebase
   */
  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      this.handleDueDate();
      await this.taskService.fireService.addTask(this.task);
      this.clearAllInputs();
      if (this.openInDialog) {
        this.closeDialog(false);
      }
    }
  }
}
