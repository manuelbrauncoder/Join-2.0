import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-task-detail-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-task-detail-card.component.html',
  styleUrl: './board-task-detail-card.component.scss'
})
export class BoardTaskDetailCardComponent implements OnInit {
  @Input() currentTask = new Task();

  task = new Task;

  ngOnInit(): void {
    this.task = new Task(this.currentTask);
  }
}
