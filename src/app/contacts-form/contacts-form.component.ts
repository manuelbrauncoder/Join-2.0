import { Component, inject, Input, OnInit } from '@angular/core';
import { UserCl } from '../models/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { InitialsPipe } from '../pipes/initials.pipe';
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InitialsPipe],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.scss',
})
export class ContactsFormComponent implements OnInit {

  userService = inject(UserService);
  taskService = inject(TaskService);
  observerService = inject(BreakpointObserverService);
  uiService = inject(UiService);

  @Input() editMode: boolean = false;
  @Input() currentUser = new UserCl();

  user = new UserCl();

  ngOnInit(): void {
    this.copyUser();
  }

  copyUser() {
    if (this.editMode) {
      this.user = new UserCl(this.currentUser);
    }
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted && !this.editMode) {
      this.saveNewUser();
      this.uiService.showConfirmPopup('Contact succesfully created ', false);
    } else if (ngForm.valid && ngForm.submitted && this.editMode) {
      this.updateEditedUser();
    }
  }

  /**
   * save new user in firebase
   */
  async saveNewUser() {
    this.user.color = this.userService.getRandomColor();
    console.log('form submitted', this.user);
    await this.userService.fireService.addUser(this.user);
    this.uiService.toggleAddContactOverlay();
  }

  /**
   * update user in firebase
   */
  async updateEditedUser() {
    console.log('user updated');
    await this.taskService.updateUserInTask(
      this.currentUser.name,
      this.user.name
    );
    await this.userService.fireService.updateUser(this.user);
    this.uiService.closeEditContactOverlay();
    this.uiService.showDetailView = false;
  }

  /**
   * delete user in firebase
   */
  async deleteUser() {
    await this.taskService.deleteUserInTask(this.user.name);
    await this.userService.fireService.deleteData(this.user.id, 'users');
    this.uiService.closeEditContactOverlay();
    this.uiService.showDetailView = false;
    this.uiService.showContactList = true;
  }
}
