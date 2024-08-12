import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ContactsLetterUserGroupComponent } from "../contacts-letter-user-group/contacts-letter-user-group.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactsLetterUserGroupComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  userService = inject(UserService);

}
