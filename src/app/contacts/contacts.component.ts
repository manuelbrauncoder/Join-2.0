import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ContactsLetterUserGroupComponent } from '../contacts-letter-user-group/contacts-letter-user-group.component';
import { UserCl } from '../models/user.class';
import { ContactsDetailViewComponent } from '../contacts-detail-view/contacts-detail-view.component';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from "../contacts-form/contacts-form.component";
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { slideInHorizontal, slideInHorizontalCenter } from "../shared/animations";
import { UiService } from '../services/ui.service';
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
  uiService = inject(UiService);

  selectedUser: UserCl = {
    name: '',
    id: '',
    uid: '',
    phone: '',
    email: '',
    password: '',
    color: '',
  };

  /**
   * select the user for detail view
   * @param user 
   */
  setSelectedUser(user: UserCl) {
    this.selectedUser = user;
    this.uiService.showDetailView = true;
    if (this.isMobileView()) {
      this.uiService.showContactList = false;
    }
  }

  isMobileView(): boolean {
    return window.innerWidth <= 950;
  }
}
