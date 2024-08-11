import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  taskService = inject(TaskService);

 async resetTasks(){
    if (confirm('tasks in firebase will be replaced with example tasks')) {
     await this.taskService.deleteAllTasks();
     await this.taskService.addLocalTasksToFirebase();
     console.log(this.taskService.fireService.tasks);
     
    }
  }
}
