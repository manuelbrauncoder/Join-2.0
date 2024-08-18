import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task.class';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { InitialsPipe } from '../pipes/initials.pipe';

@Component({
  selector: 'app-board-task-detail-card',
  standalone: true,
  imports: [CommonModule, InitialsPipe],
  templateUrl: './board-task-detail-card.component.html',
  styleUrl: './board-task-detail-card.component.scss'
})
export class BoardTaskDetailCardComponent implements OnInit {
  taskService = inject(TaskService);
  @Input() currentTask = new Task();
  task = new Task;

  toggleAddTaskOverlay(){
    this.taskService.showDetailOverlay = !this.taskService.showDetailOverlay;
  }

  ngOnInit(): void {
    this.task = new Task(this.currentTask);
  }

  getFormattedDate(){
    let date = new Date(this.task.dueDate);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  toggleSubtaskDone(index: number){
    this.task.subtasks[index].done = !this.task.subtasks[index].done;
    this.taskService.fireService.updateTask(this.task);
  }

  deleteTask(){
    this.taskService.fireService.deleteData(this.task.id, 'tasks');
    this.toggleAddTaskOverlay();
  }

  openTaskEditMode(){
    this.taskService.taskEditMode = true;
  }
}
