import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent{
  fireService = inject(FirebaseService);
  authService = inject(FirebaseAuthService);
  router = inject(Router);
  passwordFieldType: 'password' | 'text' = 'password';

  contactData = {
    email: '',
    password: ''
  }

  onSubmit(ngForm: NgForm){
    if (ngForm.valid && ngForm.submitted) {
      this.userLogin();
    }
  }

  togglePasswordFieldType(){
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
    } else {
      this.passwordFieldType = 'password';
    }
  }

   userLogin(){
     this.authService.login(this.contactData.email, this.contactData.password);
  }

  guestEmail: string = 'mail@guest.com';
  guestPw: string = '123456';

   guestLogin() {
    this.authService.login(this.guestEmail, this.guestPw).subscribe({
      next: () => {
        this.router.navigate(['/summary']);
      },
      error: (err) => {

      }
    })
  }

}
