import { Component, inject } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  uiService = inject(UiService);
}
