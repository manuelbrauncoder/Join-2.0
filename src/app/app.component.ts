import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FirebaseService } from './services/firebase.service';
import { UserService } from './services/user.service';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { CommonModule } from '@angular/common';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavBarComponent, CommonModule, CdkScrollable],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'join-2';

  authService = inject(FirebaseAuthService);

  fireService = inject(FirebaseService);
  userService = inject(UserService);
  unsubTaskList;
  unsubUsersList;

  onLogin: boolean = false;

  constructor(private router: Router) {
    this.subRouterEvents();
    this.unsubTaskList = this.fireService.getTasksList();
    this.unsubUsersList = this.fireService.getUsersList();
  }

  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        if (user) {
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!
          })
        } else {
          this.authService.currentUserSig.set(null);
        }
        console.log(this.authService.currentUserSig());
      });
  }

  subRouterEvents(){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.checkPath(event.url);
        this.hideUserDetailonRoute(event.url);
      }
    });
  }

  /**
   * hide header and nav-bar if on Login Screen
   * @param url current route
   */
  checkPath(url: string) {
    if (url === '/') {
      this.onLogin = true;
    } else {
      this.onLogin = false;
    }
  }

  /**
   * close user detail view, to prevent empty user view on route change
   * @param url 
   */
  hideUserDetailonRoute(url: string) {
    if (url !== '/contacts') {
      this.userService.showDetailView = false;
    }
  }

  

  ngOnDestroy(): void {
    this.unsubTaskList();
    this.unsubUsersList();
  }
}
