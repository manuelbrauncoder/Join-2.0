import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ContactsLetterUserGroupComponent } from '../contacts-letter-user-group/contacts-letter-user-group.component';
import { UserCl } from '../models/user.class';
import { ContactsDetailViewComponent } from '../contacts-detail-view/contacts-detail-view.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from "../contacts-form/contacts-form.component";
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { slideInHorizontal, slideInHorizontalCenter } from "../shared/animations";



@Component({
  selector: 'app-contacts',
  animations: [ slideInHorizontal, slideInHorizontalCenter],
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
  observerService = inject(BreakpointObserverService);
  showContactOverlay: boolean = false;
  showEditMode: boolean = false;

  selectedUser: UserCl = {
    name: '',
    id: '',
    uid: '',
    phone: '',
    email: '',
    password: '',
    color: '',
  };

  hideOverlay(event: boolean){
    this.showContactOverlay = event;
  }


  

  /**
   * select the user for detail view
   * @param user 
   */
  setSelectedUser(user: UserCl) {
    this.selectedUser = user;
    this.userService.showDetailView = true;
    if (this.isMobileView()) {
      this.userService.showContactList = false;
    }
  }

  isMobileView(): boolean {
    return window.innerWidth <= 950;
  }
}
