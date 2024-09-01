import { Component, inject, Input, OnInit } from '@angular/core';
import { SubTask, Task } from '../models/task.class';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { InitialsPipe } from '../pipes/initials.pipe';
import { UserCl } from '../models/user.class';
import { Router } from '@angular/router';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InitialsPipe],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
})
export class AddTaskFormComponent implements OnInit {
  taskService = inject(TaskService);
  userService = inject(UserService);
  uiService = inject(UiService);
  router = inject(Router);

  task = new Task(); // task for ngModel
  @Input() currentTask = new Task(); // task for editMode

  dueDate: Date | null | string = null;
  subTaskInput: string = '';
  subTaskEditInput: string = '';
  searchUserInput: string = '';

  @Input() openInDialog: boolean = false; // true: open in overlay, false: open in add Task View 
  @Input() editmode: boolean = false;

  editingSubtaskIndex: number | null = null; // if null, editmode not showing

  taskCategoryOptions: boolean = false;
  userOptions: boolean = false;
  showCategoryHint: boolean = false;

  constructor() {
    this.task.category = '';
  }

  ngOnInit(): void {
    this.task = new Task(this.currentTask); // copy current task to task
    this.dueDate = this.formatDateForInput();
    if (!this.editmode) {
      this.dueDate = null;
    }
  }

  formatDateForInput() {
    const date = new Date(this.task.dueDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleTaskDetailOverlay() {
    this.taskService.showDetailOverlay = !this.taskService.showDetailOverlay;
    this.taskService.taskEditMode = false;
  }

  toggleAddTaskOverlay() {
    this.taskService.showAddTaskOverlay = !this.taskService.showAddTaskOverlay;
  }

  /**
   * 
   * @returns all users, or filtered user
   */
  filteredUsers(): UserCl[] {
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
  openSubtaskEditMode(index: number) {
    this.editingSubtaskIndex = index;
    this.subTaskEditInput = this.task.subtasks[index].title;
  }

  /**
   * save the edited subtask
   * and close edit field; null = not showing
   * @param index 
   */
  saveEditedSubtask(index: number) {
    this.task.subtasks[index].title = this.subTaskEditInput;
    this.editingSubtaskIndex = null;
  }

  /**
   * delete subtask with index
   * @param index 
   */
  deleteSubtask(index: number) {
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
    this.dueDate = null;
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
    if (ngForm.valid && ngForm.submitted && !this.editmode) {
      this.handleDueDate();
      this.task.status = this.taskService.taskStatus;
      await this.taskService.fireService.addTask(this.task);
      if (this.openInDialog) {
        this.uiService.showConfirmPopup('Task added to board', true);
        this.toggleAddTaskOverlay();
      } else {
        this.router.navigate(['/board']);
        this.uiService.showConfirmPopup('Task added to board', true);
      }
    } else if (ngForm.valid && ngForm.submitted && this.editmode) {
      this.taskService.fireService.updateTask(this.task);
      this.taskService.showDetailOverlay = false;
      this.taskService.taskEditMode = false;
    }
  }
}
