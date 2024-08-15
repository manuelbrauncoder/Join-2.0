import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fireService = inject(FirebaseService);
  router = inject(Router);

  async guestLogin() {
    await this.fireService.login('mbraunpstein@googlemail.com', '123456');
  }
}
