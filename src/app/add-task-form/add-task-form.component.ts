import { Component, inject } from '@angular/core';
import { Task } from '../models/task.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { InitialsPipe } from '../pipes/initials.pipe';

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
    showOptions: boolean = false;


  constructor(){ }

  asignUserToTask(user: string){
    this.task.assignedTo.push(user);
  }

  changeTaskPrio(prio: 'urgent' | 'medium' | 'low'){
    this.task.priority = prio;
  }

  changeTaskCategory(cat: 'User Story' | 'Technical Task'){
    this.task.category = cat;
  }

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

  async saveTask() {
    this.handleDueDate();
    await this.taskService.fireService.addTask(this.task);
  }
}
