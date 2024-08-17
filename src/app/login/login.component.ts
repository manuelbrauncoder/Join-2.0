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
export class LoginComponent {
  fireService = inject(FirebaseService);
  authService = inject(FirebaseAuthService);
  router = inject(Router);

  contactData = {
    email: '',
    password: ''
  }

  onSubmit(ngForm: NgForm){
    if (ngForm.valid && ngForm.submitted) {
      this.userLogin();
    }
  }

  userLogin(){
    this.authService.login(this.contactData.email, this.contactData.password).subscribe({
      next: () => {
        console.log('User logged in');
        this.router.navigate(['/summary']);
      },
      error: (err) => {
        // handle error here, show if pw is wrong or email
        console.log('Error logging in:', err);
        
      }
    })
  }

  guestEmail: string = 'mail@guest.com';
  guestPw: string = '123456';

   guestLogin() {
    this.authService.login(this.guestEmail, this.guestPw).subscribe({
      next: () => {
        console.log('Guest logged in');
        this.router.navigate(['/summary']);
      },
      error: (err) => {
        console.log('Error signing in', err);
        
      }
    })
  }

}
