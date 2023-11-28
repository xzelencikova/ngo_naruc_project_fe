import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.css']
})
export class UserProfilePage implements OnInit {
  activeForm: 'change' | 'password' = 'change';

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to router events to update activeForm
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Update activeForm based on the current route
        this.updateActiveForm(event.url);
      }
    });
  }

  private updateActiveForm(url: string) {
    // Check the current route and set activeForm accordingly
    if (url.includes('/user-profile/change')) {
      this.activeForm = 'change';
    } else if (url.includes('/user-profile/password')) {
      this.activeForm = 'password';
    }
  }
}
