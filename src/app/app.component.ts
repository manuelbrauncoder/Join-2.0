import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FirebaseService } from './services/firebase.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'join-2';

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
