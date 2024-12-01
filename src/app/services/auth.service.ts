import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationResponse, UserLoginResponse } from '../models/user.model';

type UserRegistrationRequest = {
  username: string;
  email: string;
  password: string;
};
type UserLoginRequest = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  register(user: UserRegistrationRequest): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(`${this.apiUrl}/register`, user);
  }

  login(credentials: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Sprawdza obecność tokenu
  }
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin'; // Sprawdza, czy użytkownik ma rolę 'admin'
  }
  
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null; // Zwraca dane użytkownika lub null
  }
  logout(): void {
    localStorage.removeItem('authToken'); // Usuń token
    localStorage.removeItem('currentUser'); // Usuń dane użytkownika
  }
}
