import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ContactsLetterUserGroupComponent } from '../contacts-letter-user-group/contacts-letter-user-group.component';
import { User } from '../models/user.class';
import { ContactsDetailViewComponent } from '../contacts-detail-view/contacts-detail-view.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from "../contacts-form/contacts-form.component";

const detailHidden = { transform: 'translateX(120%)' };
const detailVisible = { transform: 'translateX(0)' };

const overLayHidden = { transform: 'translate(120%, -50%)' };
const overlayVisible = { transform: 'translate(-50%, -50%)' };

const timing = '225ms ease-in';

@Component({
  selector: 'app-contacts',
  animations: [
    trigger('openClose', [
      transition(':enter', [style(detailHidden), animate(timing, style(detailVisible))]),
      transition(':leave', [style(detailVisible), animate(timing, style(detailHidden))]),
    ]),
    trigger('toggleOverlay', [
      transition(':enter', [style(overLayHidden), animate(timing, style(overlayVisible))]),
      transition(':leave', [style(overlayVisible), animate(timing, style(overLayHidden))]),
    ]),
  ],
  standalone: true,
  imports: [
    ContactsLetterUserGroupComponent,
    ContactsDetailViewComponent,
    CommonModule,
    ContactsFormComponent
],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  userService = inject(UserService);
  showUserDetail: boolean = false;
  showContactOverlay: boolean = false;

  selectedUser: User = {
    name: '',
    id: '',
    phone: '',
    email: '',
    password: '',
    color: '',
  };

  hideOverlay(event: boolean){
    this.showContactOverlay = event;
  }

  /**
   * toggle the add or edit contact overlay
   */
  toggleOverlay(){
    this.showContactOverlay = !this.showContactOverlay;
  }

  /**
   * select the user for detail view
   * @param user 
   */
  setSelectedUser(user: User) {
    this.selectedUser = user;
    this.showUserDetail = true;
  }
}
