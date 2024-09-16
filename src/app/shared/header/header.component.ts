import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { InitialsPipe } from '../../pipes/initials.pipe';
import { Router, RouterLink } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [InitialsPipe, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  taskService = inject(TaskService);
  userService = inject(UserService);
  authService = inject(FirebaseAuthService);
  uiService = inject(UiService);
  router = inject(Router);
  password = '';

  logUserOut(){
    this.uiService.showHeaderMenu = false;
    this.router.navigate(['']);
    setTimeout(() => {
      this.authService.logout();
    }, 50);
  }

  goToRouteAndClose(route: string) {
    this.router.navigate([`${route}`]);
    this.uiService.toggleHeaderMenu();
  }

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
