import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { UiService } from '../services/ui.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  authService = inject(FirebaseAuthService);
  uiService = inject(UiService);
  router = inject(Router);
  @Output() signUp = new EventEmitter<boolean>();

  passwordFieldType: 'password' | 'text' = 'password';
  passwordConfirmationFieldType: 'password' | 'text' = 'password';

  contactData = {
    name: '',
    email: '',
    password: '',
    confirmPW: '',
    policyCheck: false
  }

  togglePasswordFieldType(){
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
    } else {
      this.passwordFieldType = 'password';
    }
  }

  togglepasswordConfirmationFieldType(){
    if (this.passwordConfirmationFieldType === 'password') {
      this.passwordConfirmationFieldType = 'text';
    } else {
      this.passwordConfirmationFieldType = 'password';
    }
  }

  hideSignUp() {
    this.signUp.emit(false);
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted && this.confirmPassword()) {
      this.uiService.showConfirmPopup('You Signed Up successfully', false);
      this.authService.register(this.contactData.email,
        this.contactData.name,
        this.contactData.password);
        setTimeout(() => {
          this.router.navigate(['/summary']);
        }, 300);
    }
  }



  confirmPassword() {
    return this.contactData.password === this.contactData.confirmPW;
  }


}
