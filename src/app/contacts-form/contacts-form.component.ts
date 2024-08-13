import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
export class ContactsFormComponent implements OnInit {
  @Output() overlayClosed = new EventEmitter<boolean>();
  @Input() editMode: boolean = false;
  userService = inject(UserService);
  @Input() currentUser = new User();
  user = new User();

  ngOnInit(): void {
    this.copyUser();
  }
  
  copyUser(){
    if (this.editMode) {
      this.user = new User(this.currentUser);
    }
  }

  closeOverlay() {
    this.overlayClosed.emit(false);
  }

  async onSubmit(ngForm: NgForm) { // edit mode? updateUser verwenden!!
    if (ngForm.valid && ngForm.submitted) {
      console.log('form submitted', this.user);
      await this.userService.fireService.addUser(this.user);
      this.closeOverlay();
    }
  }
}

// Weiter mit: editierten User speichern!!


// neuem user rnd color zuweisen
// nachdem ein user gelöscht oder bearbeitet wurde: zugewiesene user in tasks aktualisieren!
