import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'join-2.0';

  onRootPath: boolean = false;


  ngOnInit(): void {
    console.log(window.location.pathname);
    if (window.location.pathname === '/') {
      console.log('on /');
      this.onRootPath = true;
      
    } else {
      this.onRootPath = false;
    }
  }
}
