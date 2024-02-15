import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  user: string = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_surname');
  user_role: string = localStorage.getItem('user_role') + '';
  navbarOpen = false;

  private userDataSubscription: Subscription;

  constructor(private router: Router, private userDataService: UserDataService) {
    this.userDataSubscription = this.userDataService.userDataUpdate$.subscribe((updatedUser: UserModel | null) => {
      if (updatedUser !== null) {
        this.updateUserData(updatedUser);
      }
    });
  }

  updateUserData(updatedUser: UserModel) {
    this.user = `${updatedUser.name} ${updatedUser.surname}`;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.userDataSubscription.unsubscribe();
  }
}
