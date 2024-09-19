import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { RouterLink } from '@angular/router';
import { UiService } from '../services/ui.service';
import { fadeIn } from "../shared/animations";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink],
  animations: [fadeIn],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  taskService = inject(TaskService);
  authService = inject(FirebaseAuthService);
  uiService = inject(UiService);
  private datePipe = inject(DatePipe);
  timestampArr: number[] = [];

  ngOnInit(): void {
    this.uiService.showMobileGreeting();
  }

  /**
   * 
   * @returns the next due date with highest priority,
   * or an empty string if no tasks available
   */
  getnextDueDate() {
    this.timestampArr = [];
    this.getDates('urgent');
    if (this.timestampArr.length < 1) this.getDates('medium');
    if (this.timestampArr.length < 1) this.getDates('low');
    const next = this.timestampArr.length > 0 ? Math.min(...this.timestampArr) : 0;
    return next !== 0 ? this.datePipe.transform(next, 'MMMM d, yyy') : '';
  }

  getDates(prio: 'low' | 'medium' | 'urgent') {
    this.taskService.fireService.tasks.forEach((task) => {
      if (task && task.priority === prio) {
        this.timestampArr.push(task.dueDate)
      }
    });
  }

  getNumberOfTasks(status: string): number {
    let counter = 0;
    this.taskService.fireService.tasks.forEach(task => {
      if (task.status.toLowerCase() === status.toLowerCase()) {
        counter++;
      }
    });
    return counter;
  }

  getNumberOfUrgentTasks() {
    let counter = 0;
    this.taskService.fireService.tasks.forEach(task => {
      if (task.priority.toLowerCase() === 'urgent') {
        counter++;
      }
    });
    return counter;
  }

  getGreetingMessage() {
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
