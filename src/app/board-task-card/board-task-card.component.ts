import { Component, inject, Input } from '@angular/core';
import { Task } from '../models/task.class';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../pipes/initials.pipe';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-board-task-card',
  standalone: true,
  imports: [CommonModule, InitialsPipe],
  templateUrl: './board-task-card.component.html',
  styleUrl: './board-task-card.component.scss'
})
export class BoardTaskCardComponent {

  fireService = inject(FirebaseService);

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

  getColorForUser(assignedToUser: string) {
    const user = this.fireService.users.find(
      (user) => user.name.toLowerCase() === assignedToUser.toLowerCase()
    );
    return user ? user.color : '#29abe2'
  }

}
