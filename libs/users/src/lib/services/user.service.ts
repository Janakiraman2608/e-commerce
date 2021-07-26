import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment'
import * as countriesLib from 'i18n-iso-countries';


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

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlUser}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
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
