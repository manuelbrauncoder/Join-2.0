import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [LoginComponent, SignUpComponent, CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  showSignUp: boolean = false;

  toggleSignUp(){
    this.showSignUp = !this.showSignUp;
  }

  closeSignUp(){
    this.showSignUp = false;
  }
}
