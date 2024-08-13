import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  taskService = inject(TaskService);
  userService = inject(UserService);

 async resetTasks(){
    if (confirm('replace data in firebase with example data')) {
     await this.taskService.deleteAllTasks();
     await this.taskService.addLocalTasksToFirebase();
     console.log(this.taskService.fireService.tasks);
     await this.userService.deleteAllUsers();
     await this.userService.addLocalUsersToFirebase();
    }
  }
}
