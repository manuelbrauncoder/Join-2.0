/**
 * This service is for managing ui elements
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  showDetailView = false; // contact detail view
  showContactList = true; // contact list view
  showContactMenu = false; // menu popup in mobile detail contact view
  showAddContactOverlay = false; // add contact overlay
  showEditContactOverlay = false; // edit contact overlay
  showHeaderMenu = false; // menu popup in header

  constructor() { }

  /**
   * toggle menu in header
   */
  toggleHeaderMenu() {
    this.showHeaderMenu = !this.showHeaderMenu;
  }

  /**
   * toggle add contact overlay
   */
  toggleAddContactOverlay(){
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
