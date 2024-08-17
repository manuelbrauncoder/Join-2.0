import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  authService = inject(FirebaseAuthService);
  @Output() signUp = new EventEmitter<boolean>();

  contactData = {
    name: '',
    email: '',
    password: '',
    confirmPW: '',
    policyCheck: false
  }

  hideSignUp() {
    this.signUp.emit(false);
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted && this.confirmPassword()) {
      console.log(this.contactData);
      this.authService.register(this.contactData.email,
        this.contactData.name,
        this.contactData.password)
    }
  }



  confirmPassword() {
    return this.contactData.password === this.contactData.confirmPW;
  }


}
