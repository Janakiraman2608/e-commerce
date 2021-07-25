import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import {environment} from '@env/environment'


@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrlUser = environment.apiURL+'user/'
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUser);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUser}${userId}`);
  }



  createUser(user: User) {
    return this.http.post(this.apiUrlUser, user);
  }

  updateUser(user: User) {
    return this.http.put(`${this.apiUrlUser}${user.id}`, user);
  }
  deleteUser(userId: string) {
    return this.http.delete(
      `${this.apiUrlUser}${userId}`
    );
  }
}
