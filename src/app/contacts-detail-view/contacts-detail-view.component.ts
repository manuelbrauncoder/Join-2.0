import { Component, inject, Input } from '@angular/core';
import { User } from '../models/user.class';
import { InitialsPipe } from '../pipes/initials.pipe';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';

const overLayHidden = { transform: 'translate(120%, -50%)' };
const overlayVisible = { transform: 'translate(-50%, -50%)' };

const timing = '225ms ease-in';

@Component({
  selector: 'app-contacts-detail-view',
  animations: [
    trigger('toggleOverlay', [
      transition(':enter', [
        style(overLayHidden),
        animate(timing, style(overlayVisible)),
      ]),
      transition(':leave', [
        style(overlayVisible),
        animate(timing, style(overLayHidden)),
      ]),
    ]),
  ],
  standalone: true,
  imports: [InitialsPipe, CommonModule, ContactsFormComponent],
  templateUrl: './contacts-detail-view.component.html',
  styleUrl: './contacts-detail-view.component.scss',
})
export class ContactsDetailViewComponent {
  userService = inject(UserService);
  taskService = inject(TaskService);

  showEditOverlay: boolean = false;

  @Input() currentUser: User = {
    name: '',
    id: '',
    phone: '',
    email: '',
    password: '',
    color: '',
  };

  toggleEditOverlay() {
    this.showEditOverlay = !this.showEditOverlay;
  }

  hideEditMode(event: boolean) {
    this.showEditOverlay = event;
  }

  async deleteUser() {
    await this.taskService.deleteUserInTask(this.currentUser.name);
    await this.userService.fireService.deleteData(this.currentUser.id, 'users');
    this.userService.showDetailView = false;
  }
}
