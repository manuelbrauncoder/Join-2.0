import { Component, inject, Input } from '@angular/core';
import { UserCl } from '../models/user.class';
import { InitialsPipe } from '../pipes/initials.pipe';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { slideInHorizontal, slideInHorizontalCenter, slideInVertical } from "../shared/animations";




@Component({
  selector: 'app-contacts-detail-view',
  animations: [slideInHorizontal, slideInHorizontalCenter, slideInVertical],
  standalone: true,
  imports: [InitialsPipe, CommonModule, ContactsFormComponent],
  templateUrl: './contacts-detail-view.component.html',
  styleUrl: './contacts-detail-view.component.scss',
})
export class ContactsDetailViewComponent {
  userService = inject(UserService);
  taskService = inject(TaskService);
  observerService = inject(BreakpointObserverService);

  


  @Input() currentUser: UserCl = {
    name: '',
    id: '',
    uid: '',
    phone: '',
    email: '',
    password: '',
    color: '',
  };



  toggleEditOverlay() {
    this.userService.showEditOverlay = !this.userService.showEditOverlay;
    this.userService.showEditPopup = false;
  }

  // hideEditMode(event: boolean) {
  //   this.userService.showEditOverlay = event;
  // }

  async deleteUser() {
    await this.taskService.deleteUserInTask(this.currentUser.name);
    await this.userService.fireService.deleteData(this.currentUser.id, 'users');
    this.userService.showDetailView = false;
  }
}
