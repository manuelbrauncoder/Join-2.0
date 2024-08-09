import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  taskService = inject(TaskService);

}
