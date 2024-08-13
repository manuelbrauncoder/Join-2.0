import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ContactsLetterUserGroupComponent } from '../contacts-letter-user-group/contacts-letter-user-group.component';
import { User } from '../models/user.class';
import { ContactsDetailViewComponent } from '../contacts-detail-view/contacts-detail-view.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

const hidden = { transform: 'translateX(120%)' };
const visible = { transform: 'translateX(0)' };
const timing = '225ms ease-in';

@Component({
  selector: 'app-contacts',
  animations: [
    trigger('openClose', [
      transition(':enter', [style(hidden), animate(timing, style(visible))]),
      transition(':leave', [style(visible), animate(timing, style(hidden))]),
    ]),
  ],
  standalone: true,
  imports: [
    ContactsLetterUserGroupComponent,
    ContactsDetailViewComponent,
    CommonModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  userService = inject(UserService);
  showUserDetail: boolean = false;

  selectedUser: User = {
    name: '',
    id: '',
    phone: '',
    email: '',
    password: '',
    color: '',
  };

  setSelectedUser(user: User) {
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.showUserDetail = true;
  }
}
