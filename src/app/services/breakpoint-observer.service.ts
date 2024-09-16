import { DestroyRef, inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  userService = inject(UserService);
  uiService = inject(UiService);
  mobile = false;
  mobileLandscape = false;

  constructor(private responsive: BreakpointObserver,
    private destroyRef: DestroyRef,
  ) { }

  /**
   * init the breakpoint observer
   * call in app-components.ts in ngOnInit()
   */
  initObserver() {
    this.responsive.observe([
      '(max-width: 950px)',
      Breakpoints.HandsetLandscape
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        const breakpoints = state.breakpoints;
        if (breakpoints['(max-width: 950px)']) {
          this.mobile = true;
          this.hideContactList();
        } else {
          this.uiService.showContactList = true;
          this.mobile = false;
        }
        if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.mobileLandscape = true;
        } else {
          this.mobileLandscape = false;
        }
        if (breakpoints['(max-width: 950px)'] && breakpoints[Breakpoints.HandsetLandscape]) {
          this.mobileLandscape = true;
        }
      });
  }

  hideContactList() {
    if (this.uiService.showDetailView) {
      this.uiService.showContactList = false;
    }
  }
}
