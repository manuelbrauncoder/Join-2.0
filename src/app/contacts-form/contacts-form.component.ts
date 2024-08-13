import { Component, EventEmitter, inject, Output } from '@angular/core';
import { User } from '../models/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.scss',
})
export class ContactsFormComponent {
  @Output() overlayClosed = new EventEmitter<boolean>();
  userService = inject(UserService);
  user = new User();

  closeOverlay() {
    this.overlayClosed.emit(false);
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log('form submitted', this.user);
      await this.userService.fireService.addUser(this.user);
      this.closeOverlay();
    }
  }
}


// neuem user rnd color zuweisen
// nachdem ein user gelöscht oder bearbeitet wurde: zugewiesene user in tasks aktualisieren!
// im board: dialog entfernen und so wie hier umsetzen