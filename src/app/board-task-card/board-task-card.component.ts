import { Component, inject, Input } from '@angular/core';
import { Task } from '../models/task.class';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../pipes/initials.pipe';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-board-task-card',
  standalone: true,
  imports: [CommonModule, InitialsPipe],
  templateUrl: './board-task-card.component.html',
  styleUrl: './board-task-card.component.scss'
})
export class BoardTaskCardComponent {

  taskService = inject(TaskService);

  @Input()task: Task = {
    id: '',
    title: '',
    description: '',
    subtasks: [],
    assignedTo: [],
    priority: 'medium',
    dueDate: 0,
    category: 'Technical Task',
    status: 'todo'
  }

  getSubtasksDoneSum(){
    let counter = 0;
    this.task.subtasks.forEach(subtask => {
      if (subtask.done === true) {
        counter++;
      }
    });
    return counter;
  }

  setProgressValue(){
    let all = this.task.subtasks.length;
    let done = this.getSubtasksDoneSum();
    let percent = (done / all) * 100;    
    return percent;
  }

}
