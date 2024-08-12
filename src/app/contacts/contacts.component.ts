import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ContactsLetterUserGroupComponent } from "../contacts-letter-user-group/contacts-letter-user-group.component";
import { User } from '../models/user.class';
import { ContactsDetailViewComponent } from "../contacts-detail-view/contacts-detail-view.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactsLetterUserGroupComponent, ContactsDetailViewComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
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
    color: ''
  }

  setSelectedUser(user: User){
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.showUserDetail = true;
  }

}
