import { Injectable } from '@angular/core';

const TOKEN = 'awtToken';

@Injectable({
  providedIn: 'root',
})
export class LocalSService {
  setToken(data: string ) {
    console;
    localStorage.setItem(TOKEN, data);
  }
  getToken() {
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
