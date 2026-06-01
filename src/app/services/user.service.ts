import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { PasswordModel } from '../models/password.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = `${environment.baseUrl}/users`;

  public selectedUser$: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  public user: UserModel = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    role: '',
  };

  constructor(private http: HttpClient) {
    this.selectedUser$.subscribe((selection) => {
      this.user = selection;
    });
  }

  getLoggedInUser(): UserModel {
    console.log(this.user);
    return this.user;
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrl);
  }

  getUserById(user_id: number) {
    return this.http.get<UserModel>(`${this.baseUrl}/${user_id}`);
  }

  updateUserById(user_id: number, data: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUrl}/${user_id}`, data);
  }

  deleteUserById(user_id: number): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.baseUrl}/${user_id}`);
  }

  authenticateUser(data: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/auth`, data);
  }

  addNewUser(body: UserModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${this.baseUrl}/registration`, body);
  }

  updateUserPassword(
    userId: number,
    newPassword: PasswordModel,
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${userId}/update-password`,
      newPassword,
    );
  }
}
