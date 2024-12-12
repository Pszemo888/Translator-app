import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';
    private userProfileSubject = new BehaviorSubject<User | null>(null);
    userProfile$ = this.userProfileSubject.asObservable();
  
    constructor(private http: HttpClient) {}
  
    getProfile(): Observable<User> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      });
      
      return this.http.get<User>(`${this.apiUrl}/profile`, { headers }).pipe(
        tap(profile => this.userProfileSubject.next(profile))
      );
   }
}