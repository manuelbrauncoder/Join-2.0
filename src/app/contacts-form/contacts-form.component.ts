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
  @Output() editOverlayClosed = new EventEmitter<boolean>();
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

  closeEditMode(){
    this.editOverlayClosed.emit(false);
  }

  closeOverlay() {
    this.overlayClosed.emit(false);
  }

  async onSubmit(ngForm: NgForm) { 
    if (ngForm.valid && ngForm.submitted && !this.editMode) {
      console.log('form submitted', this.user);
      await this.userService.fireService.addUser(this.user);
      this.closeOverlay();
    } else if(ngForm.valid && ngForm.submitted && this.editMode){
      console.log('user updated');
      await this.userService.fireService.updateUser(this.user);
      this.closeEditMode();
      this.userService.showDetailView = false;
    }
  }

  async deleteUser() {
    await this.userService.fireService.deleteData(this.user.id, 'users');
    this.closeEditMode();
    this.userService.showDetailView = false;
  }
}




// neuem user rnd color zuweisen
// nachdem ein user gelöscht oder bearbeitet wurde: zugewiesene user in tasks aktualisieren!
