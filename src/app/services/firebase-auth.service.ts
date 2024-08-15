import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  Auth,
  user,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnDestroy {
  fireService = inject(FirebaseService);

  auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.subUserLogin();
   }

   ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
   }

   /**
   * firebase auth user sign in method
   * @param email 
   * @param password 
   */
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log('User logged in:', userCredential.user);
    } catch (err: any) {
      console.error('Error logging in:', err.code, err.message);
    }
  }

  /**
   * firebase auth user sign out method
   */
  async signOut() {
    try {
      await signOut(this.auth);
      console.log('User signed out');
      
    } catch (error) {
      console.log('Error signing out', error);
      
    }
  }

  /**
   * subscribe if a user is signed in
   * @returns 
   */
  subUserLogin() {
    return this.user$.subscribe((aUser: User | null) => {
      if (aUser === null) {
        console.log('Currently no user loged in', aUser);
      }
    });
  }
}
