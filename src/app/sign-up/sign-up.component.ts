import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { UserCl } from '../models/user.class';
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
export class SignUpComponent implements OnInit {
  authService = inject(FirebaseAuthService);
  @Output() signUp = new EventEmitter<boolean>();

  newUser: UserCl = new UserCl();
  passwordConfirmation: string = '';
  policyCheck: boolean = false;

  hideSignUp() {
    this.signUp.emit(false);
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log(this.newUser);
      this.authService.register(
        this.newUser.email,
        this.newUser.name,
        this.newUser.password
      ).subscribe({
        next: () => {
          // handle whats next
        },
        error: (err) => {
          console.log('Error register User', err);
        }
      });
    }
  }

  confirmPassword() {
    return this.newUser.password === this.passwordConfirmation;
  }

  ngOnInit(): void {
    this.policyCheck = false;
  }
}
