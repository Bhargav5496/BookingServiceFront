import { Injectable } from '@angular/core';

const USER  = 's_user';
const TOKEN  = 's_token';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  public getUserId(): string | null {
    const user = this.getUser();
    return user ? user.userId : null;
  }

  public getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  public isClientLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const role = this.getUserRole();
    return role === 'CLIENT';
  }

  public isCompanyLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const role = this.getUserRole();
    return role === 'COMPANY';
  }

  public signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER); 
  }
}
