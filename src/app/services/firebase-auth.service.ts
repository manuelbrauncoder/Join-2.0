import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  AuthErrorCodes,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from '@angular/fire/auth';
import { catchError, from, Observable, of, tap, throwError } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { UserInterface } from '../interfaces/user-interface';
import { Router } from '@angular/router';
import { UiService } from './ui.service';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  router = inject(Router);
  fireService = inject(FirebaseService);
  uiService = inject(UiService);
  taskService = inject(TaskService);
  auth = inject(Auth);
  user$ = user(this.auth);
  
  wrongPw = false;
  userEmailCache = '';

  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor() { }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((response) => {
      updateProfile(response.user, { displayName: username })
      this.fireService.addUser(this.fireService.getCleanUserJson(this.createUser(response, username, email)));
    }
    );
    return from(promise);
  }

  createUser(response: any, username: string, email: string){
    return {
      id: '',
      uid: response.user.uid,
      name: username,
      email: email,
      password: '',
      phone: '',
      color: ''
    }
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.wrongPw = false;
      this.uiService.mobileGreetingDone = false;
      this.router.navigate(['/summary']);
    }).catch((error) => {
      const wrongPw = AuthErrorCodes.INVALID_PASSWORD;      
      if (wrongPw) {
        this.wrongPw = true;
      } else {
        console.log('onother Error Code', error);
      }
    });
    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  async deleteAccount() {
    const currentUser = this.auth.currentUser;
    if (currentUser?.displayName === 'Guest User') {
      this.uiService.showConfirmPopup('Guest Account can not be deleted', false);
      return;
    } else if (currentUser) {
      this.userEmailCache = currentUser.email!;
      deleteUser(currentUser).then(() => {
        this.deleteUserInFirestore(currentUser.uid);
      }).then(() => {
        this.taskService.deleteUserInTask(currentUser.displayName!);
      }).catch((error) => {
        const errCode = AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN
        if (errCode) {
          this.uiService.showPWConfirmation = true;
        } else {
          console.log('Error deleting User Account', error);
        }
      })
    }
  }

  reAuthenticateUser(email: string, password: string) {
    const credential = EmailAuthProvider.credential(email, password);
    if (this.auth.currentUser) {
      reauthenticateWithCredential(this.auth.currentUser, credential).then(() => {
        this.uiService.showPWConfirmation = false;
        this.uiService.showHeaderMenu = false;
        this.uiService.wrongPwConfirmation = false;
        this.deleteAccount();
      }).catch((error) => {
        const errCode = AuthErrorCodes.INVALID_PASSWORD;
        if (errCode) {
          this.uiService.wrongPwConfirmation = true;
        } else {
          console.log('Error reauthenticate User', error);
        }
      })
    }
  }

  async deleteUserInFirestore(uid: string) {
    for (let i = 0; i < this.fireService.users.length; i++) {
      const user = this.fireService.users[i];
      if (user.uid === uid) {
        await this.fireService.deleteData(user.id, 'users');
      }
    }
  }
}
