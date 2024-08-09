import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  fireService = inject(FirebaseService);

  logTasks(){
    console.log('tasks:', this.fireService.tasks);
    
  }
}
