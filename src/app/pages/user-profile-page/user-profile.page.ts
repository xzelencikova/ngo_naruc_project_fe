import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.css']
})
export class UserProfilePage implements OnInit {
  activeForm: 'change' | 'password' = 'change';
  public user: UserModel = this.userService.getLoggedInUser();

  constructor(private router: Router, private userService: UserService) {
    if (this.user._id === 0) {
      this.userService.getUserById(Number(localStorage.getItem('user_id'))).subscribe(user => {
        this.userService.selectedUser$.emit(user);
      });

      this.userService.selectedUser$.subscribe(selection => {
        this.user = selection;
      });
    }
  }

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
