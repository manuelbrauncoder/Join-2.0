import { Component, inject } from '@angular/core';
import { Task } from '../models/task.class';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
    task = new Task();

  constructor(){ }

  changeTaskPrio(prio: 'urgent' | 'medium' | 'low'){
    this.task.priority = prio;
  }
}
