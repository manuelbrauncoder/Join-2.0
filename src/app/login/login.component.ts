import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fireService = inject(FirebaseService);
  authService = inject(FirebaseAuthService);
  router = inject(Router);

  testEmail: string = 'mbraunpstein@googlemail.com';
  testPw: string = '123456';

   signIn() {
    this.authService.login(this.testEmail, this.testPw).subscribe({
      next: () => {
        console.log('User loged in');
        this.router.navigate(['/summary'])
      },
      error: (err) => {
        console.log('Error signing in', err);
        
      }
    })
  }

}
