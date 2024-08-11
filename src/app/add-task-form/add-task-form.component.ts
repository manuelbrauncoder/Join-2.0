import { Component, inject } from '@angular/core';
import { SubTask, Task } from '../models/task.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { InitialsPipe } from '../pipes/initials.pipe';
import { User } from '../models/user.class';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InitialsPipe],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
    taskService = inject(TaskService);
    userService = inject(UserService);
    task = new Task();
    dueDate: Date | null = null;
    subTaskInput: string = '';  // input for new subtasks
    searchUserInput: string = ''; 

    taskCategoryOptions: boolean = false;
    userOptions: boolean = false;

    filteredUsers(): User[]{
      if(!this.searchUserInput) {
        return this.userService.fireService.users;
      }
      return this.userService.fireService.users.filter(user => user.name.toLowerCase().includes(this.searchUserInput));
    }

  constructor(){ 
    this.task.category = '';
  }

  

  /**
   * toggle options for user to asign
   */
  toggleUserOptions(){
    this.userOptions = !this.userOptions;
  }

  /**
   * toggle options for category
   */
  toggleCategoryOptions(){
    this.taskCategoryOptions = !this.taskCategoryOptions;
  }

  clearAllInputs(){
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
  clearSubtaskInput(){
    this.subTaskInput = '';
  }

  /**
   * add subtask to task.subtasks
   * clear input
   */
  addSubtask(){
   let subtask = new SubTask({title: this.subTaskInput, done: 'false'})
   this.task.subtasks.push(subtask);
   this.subTaskInput = '';   
  }

  /**
   * push selected user to task.assignedTo
   * @param user 
   */
  asignUserToTask(user: string){
    if (!this.task.assignedTo.includes(user)) {
      this.task.assignedTo.push(user);
    } else {
      let index = this.task.assignedTo.indexOf(user);
      this.task.assignedTo.splice(index, 1);
    }
  }

  isUserChecked(user: string){
    return this.task.assignedTo.includes(user);
  }

  changeTaskPrio(prio: 'urgent' | 'medium' | 'low'){
    this.task.priority = prio;
  }

  /**
   * change the task category
   * @param cat 
   */
  changeTaskCategory(cat: 'User Story' | 'Technical Task'){
    this.task.category = cat;
    this.taskCategoryOptions = false;
  }

  /**
   * safe date as timestamp, handle wrong format
   */
  handleDueDate(){
    if (this.dueDate) {
      const date = typeof this.dueDate === 'string' ? new Date(this.dueDate) : this.dueDate;
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
  async saveTask() {
    this.handleDueDate();
    await this.taskService.fireService.addTask(this.task);
  }
}


