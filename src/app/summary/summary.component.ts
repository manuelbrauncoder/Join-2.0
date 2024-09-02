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

  getGreetingMessage(){
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 4 && hours < 11) {
      return 'Good Morning,';
    } else if (hours >= 11 && hours < 14) {
      return 'Good Day,';
    } else if (hours >= 14 && hours < 17) {
      return 'Good Afternoon,';
    } else if (hours >= 17 && hours < 22) {
      return 'Good Evening,';
    } else {
      return 'Good Night,';
    }
    
  }
}
