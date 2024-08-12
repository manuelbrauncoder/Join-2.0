import { Component, Input } from '@angular/core';
import { LetterGroup } from '../models/user.class';
import { InitialsPipe } from '../pipes/initials.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts-letter-user-group',
  standalone: true,
  imports: [InitialsPipe, CommonModule],
  templateUrl: './contacts-letter-user-group.component.html',
  styleUrl: './contacts-letter-user-group.component.scss'
})
export class ContactsLetterUserGroupComponent {

  @Input()userGroup: LetterGroup = {
    letter: '',
    users: []
  };

}
