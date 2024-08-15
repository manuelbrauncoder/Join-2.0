import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserCl } from '../models/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { InitialsPipe } from '../pipes/initials.pipe';

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

  @Output() overlayClosed = new EventEmitter<boolean>();
  @Output() editOverlayClosed = new EventEmitter<boolean>();

  @Input() editMode: boolean = false;
  @Input() currentUser = new UserCl(); // user before edited

  user = new UserCl(); // user after edited

  ngOnInit(): void {
    this.copyUser();
  }

  /**
   * copy current User
   * to prevent change User data if not saved
   * becouse of two way binding!
   */
  copyUser() {
    if (this.editMode) {
      this.user = new UserCl(this.currentUser);
    }
  }

  /**
   * close edit window
   */
  closeEditMode() {
    this.editOverlayClosed.emit(false);
  }

  /**
   * close add window
   */
  closeOverlay() {
    this.overlayClosed.emit(false);
  }

  /**
   * handle form subit
   * @param ngForm
   */
  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted && !this.editMode) {
      this.saveNewUser();
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
    this.closeOverlay();
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
    this.closeEditMode();
    this.userService.showDetailView = false;
  }

  /**
   * delete user in firebase
   */
  async deleteUser() {
    await this.taskService.deleteUserInTask(this.user.name);
    await this.userService.fireService.deleteData(this.user.id, 'users');
    this.closeEditMode();
    this.userService.showDetailView = false;
  }
}
