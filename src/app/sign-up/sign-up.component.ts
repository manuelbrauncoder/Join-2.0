import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { UiService } from '../services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  authService = inject(FirebaseAuthService);
  uiService = inject(UiService);
  router = inject(Router);
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
      this.uiService.showConfirmPopup('You Signed Up successfully', false);
      console.log(this.contactData);
      this.authService.register(this.contactData.email,
        this.contactData.name,
        this.contactData.password);
        
        this.authService.currentUserSig.set({
          username: this.contactData.name,
          email: this.contactData.email
        })
        setTimeout(() => {
          this.router.navigate(['/summary']);
        }, 300);
    }
  }



  confirmPassword() {
    return this.contactData.password === this.contactData.confirmPW;
  }


}
