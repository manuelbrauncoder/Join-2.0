import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { InitialsPipe } from '../../pipes/initials.pipe';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [InitialsPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  taskService = inject(TaskService);
  userService = inject(UserService);
  authService = inject(FirebaseAuthService);
  uiService = inject(UiService);
  router = inject(Router);


  logUserOut(){
    this.router.navigate(['']);
    setTimeout(() => {
      this.authService.logout();
    }, 50);
  }

  showNameAsString(){
    let name = this.authService.currentUserSig()?.username;
    let nameAsString = name?.toString()
    return nameAsString;
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
