import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import {
  Auth,
  user,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { from, Observable, Subscription } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  fireService = inject(FirebaseService);

  auth = inject(Auth);
  user$ = user(this.auth);

  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor() {
  }

  setUserObject(email: string, username: string){

  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((response) => {
      updateProfile(response.user, { displayName: username })
      console.log(response.user.uid);
      this.fireService.addUser(this.fireService.getCleanUserJson({
        id: '',
        uid: response.user.uid,
        name: username,
        email: email,
        password: '',
        phone: '',
        color: ''
      }));
      
    }
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password).then(()=>{});
    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

 

  // Login: hint bei falschem Passwort
  // Wenn kein User eingelogt, redirect to login page


}
