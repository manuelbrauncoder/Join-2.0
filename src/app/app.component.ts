import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FirebaseService } from './services/firebase.service';
import { UserService } from './services/user.service';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { CommonModule } from '@angular/common';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { BreakpointObserverService } from './services/breakpoint-observer.service';
import { UiService } from './services/ui.service';

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
  observerService = inject(BreakpointObserverService);
  fireService = inject(FirebaseService);
  userService = inject(UserService);
  uiService = inject(UiService);
  unsubTaskList;
  unsubUsersList;

  onLogin: boolean = false;

  constructor(private router: Router) {
    this.subRouterEvents();
    this.unsubTaskList = this.fireService.getTasksList();
    this.unsubUsersList = this.fireService.getUsersList();
  }

  ngOnInit(): void {
      this.initAuthSignal();
      this.observerService.initObserver();
  }


  initAuthSignal() {
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
        this.setActiveSection(event.url);
      }
    });
  }

  setActiveSection(url: string) {
    
    switch (url) {
      case '/summary':        
        this.uiService.activeSection = 'summary';
        break;
      case '/addTask':
        this.uiService.activeSection = 'addTask';
        break;
      case '/board':
        this.uiService.activeSection = 'board';
        break;
      case '/contacts':
        this.uiService.activeSection = 'contacts';
        break;
      default:
        this.uiService.activeSection = '';
        break;
    }
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
      this.uiService.showDetailView = false;
    }
  }

  

  ngOnDestroy(): void {
    this.unsubTaskList();
    this.unsubUsersList();
  }
}
