import { DestroyRef, inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  
  userService = inject(UserService);
  mobile = false;


  constructor(private responsive: BreakpointObserver,
    private destroyRef: DestroyRef,
  ) { }

  initObserver() {
    this.responsive.observe(`(max-width: 950px)`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        if (!state.matches) {
          // Desktop
          this.userService.showContactList = true;
          this.mobile = false;
          console.log('Desktop');
        } else if (state.matches) {
          // Mobile
          console.log('Mobile');
          this.mobile = true;
          this.hideContactList();
        }
      })
  }

  hideContactList(){
    if (this.userService.showDetailView) {
      this.userService.showContactList = false;
    }
  }
}
