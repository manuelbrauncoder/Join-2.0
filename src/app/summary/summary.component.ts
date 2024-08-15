import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  taskService = inject(TaskService);
  authService = inject(FirebaseAuthService);

  getNumberOfTasks(status: string): number {
    let counter = 0;
    this.taskService.fireService.tasks.forEach(task => {
      if (task.status.toLowerCase() === status.toLowerCase()) {
        counter++;
      }
    });
    return counter;
  }

  getNumberOfUrgentTasks(){
    let counter = 0;
    this.taskService.fireService.tasks.forEach(task => {
      if (task.priority.toLowerCase() === 'urgent') {
        counter++;
      }
    });
    return counter;
  }
}
