import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import { LocalSService } from './localS.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrlUser = environment.apiURL + 'user/';
  constructor(private http: HttpClient, private localStorage: LocalSService) {}

  login(
    email: string,
    password: string
  ): Observable<{ email: string; token: string }> {
    return this.http.post<{ email: string; token: string }>(
      `${this.apiUrlUser}login`,
      { email, password }
    );
  }

  logout(){
    this.localStorage.removeToken()
  }

}
