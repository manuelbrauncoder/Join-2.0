import { Component, inject, Input } from '@angular/core';
import { User } from '../models/user.class';
import { InitialsPipe } from '../pipes/initials.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts-detail-view',
  standalone: true,
  imports: [InitialsPipe, CommonModule],
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
