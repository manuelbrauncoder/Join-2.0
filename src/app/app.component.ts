import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FirebaseService } from './services/firebase.service';

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
  unsubTaskList;

  onLogin: boolean = false;

  constructor(private router: Router) {
    this.subRouterEvents();
    this.unsubTaskList = this.fireService.getTaskList();
  }

  subRouterEvents(){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        //console.log('On Route:', event.url);
        this.checkPath(event.url);
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

  

  ngOnDestroy(): void {
    this.unsubTaskList();
  }
}
