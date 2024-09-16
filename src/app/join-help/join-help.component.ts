import { Component, inject } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-join-help',
  standalone: true,
  imports: [],
  templateUrl: './join-help.component.html',
  styleUrl: './join-help.component.scss'
})
export class JoinHelpComponent {
  uiService = inject(UiService);
}
