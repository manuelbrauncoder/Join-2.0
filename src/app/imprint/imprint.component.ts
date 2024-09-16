import { Component, inject } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  uiService = inject(UiService);
}
