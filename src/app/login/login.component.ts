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

  async signIn() {
    await this.authService.signIn('mbraunpstein@googlemail.com', '123456');
  }

}
