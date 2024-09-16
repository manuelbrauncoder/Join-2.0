import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-task-card-empty',
  standalone: true,
  imports: [],
  templateUrl: './board-task-card-empty.component.html',
  styleUrl: './board-task-card-empty.component.scss'
})
export class BoardTaskCardEmptyComponent {
  @Input()status: string = '';

  getStatusString(): string {
    switch (this.status) {
      case 'todo':
        return 'No tasks To do';
      case 'progress':
        return 'No tasks in progress';
      case 'feedback':
        return 'No tasks for feedback';
      case 'done':
        return 'No tasks done';
      default:
        return 'todo';
    }
  }
}



