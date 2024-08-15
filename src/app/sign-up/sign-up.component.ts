import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserCl } from '../models/user.class';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  @Output() signUp = new EventEmitter<boolean>();

  newUser: UserCl = new UserCl;
  passwordConfirmation: string = '';
  policyCheck: boolean = false;

  hideSignUp(){
    this.signUp.emit(false);
  }

 async onSubmit(ngForm: NgForm){
    if (ngForm.valid && ngForm.submitted && this.confirmPassword()) {
      console.log(this.newUser);
      
    }
  }

  confirmPassword(){
    return this.newUser.password === this.passwordConfirmation;
  }

  ngOnInit(): void {
    this.policyCheck = false;
  }
}
