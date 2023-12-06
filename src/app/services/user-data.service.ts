import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.userSource.asObservable();

  updateUser(user: UserModel) {
    this.userSource.next(user);
  }

  // Add a new Subject for user data updates
  private userDataUpdateSource = new BehaviorSubject<UserModel | null>(null);
  userDataUpdate$ = this.userDataUpdateSource.asObservable();

  // Method to update user data and notify subscribers
  updateUserData(updatedUser: UserModel) {
    this.userSource.next(updatedUser);
    this.userDataUpdateSource.next(updatedUser);
  }
}
