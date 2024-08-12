import { Component, Input } from '@angular/core';
import { User } from '../models/user.class';

@Component({
  selector: 'app-contacts-detail-view',
  standalone: true,
  imports: [],
  templateUrl: './contacts-detail-view.component.html',
  styleUrl: './contacts-detail-view.component.scss'
})
export class ContactsDetailViewComponent {
  
  @Input() currentUser: User = {
    name: '',
    id: '',
    phone: '',
    email: '',
    password: '',
    color: ''
  }
}
