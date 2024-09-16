/**
 * This service is for managing ui elements
 */
import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private router = inject(Router);
  private location = inject(Location);

  activeSection: 'summary' | 'addTask' | 'board' | 'contacts' | '' = '';

  showDetailView = false;
  showContactList = true;
  showContactMenu = false;
  showAddContactOverlay = false;
  showEditContactOverlay = false;
  showHeaderMenu = false;

  showConfirmationPopup = false;
  confirmText = '';
  showConfirmIcon = false;

  mobileGreeting = false;
  mobileGreetingDone = true;

  userIsLoggedIn = false;
  showPWConfirmation = false;
  wrongPwConfirmation = false;

  constructor() { }

  goHome(){
    if (this.userIsLoggedIn) {
      this.router.navigate(['summary']);
    }
  }

  goBack(){
    if (!this.userIsLoggedIn) {
      this.router.navigate(['']);
    } else {
      this.location.back();
    }
  }

  showMobileGreeting() {
    if (!this.mobileGreetingDone) {
      this.mobileGreeting = true;
      setTimeout(() => {
        this.mobileGreeting = false;
      }, 2500);
      this.mobileGreetingDone = true;
    }

  }

  showConfirmPopup(text: string, showIcon: boolean) {
    this.confirmText = text;
    this.showConfirmIcon = showIcon;
    this.showConfirmationPopup = true;
    setTimeout(() => {
      this.showConfirmationPopup = false;
    }, 2500);
  }

  /**
   * toggle menu in header
   */
  toggleHeaderMenu() {
    this.showHeaderMenu = !this.showHeaderMenu;
  }

  /**
   * toggle add contact overlay
   */
  toggleAddContactOverlay() {
    this.showAddContactOverlay = !this.showAddContactOverlay;
  }

  /**
   * Close add and edit overlay
   */
  closeContactOverlay() {
    this.showAddContactOverlay = false;
    this.showEditContactOverlay = false;
  }

  /**
   * toggle contact menu in contacts detail mobile view
   */
  toggleContactMenu() {
    this.showContactMenu = !this.showContactMenu;
  }

  /**
   * show list, hide detail view
   */
  closeDetailViewMobile() {
    this.showDetailView = false;
    this.showContactList = true;
  }

  /**
   * close edit window
   */
  closeEditContactOverlay() {
    this.showEditContactOverlay = false;
    this.showContactList = true;
  }

  /**
   * open edit contact overlay
   * close menu
   */
  openEditContactOverlayMobile() {
    this.showEditContactOverlay = !this.showEditContactOverlay;
    this.showContactMenu = false;
  }
}
