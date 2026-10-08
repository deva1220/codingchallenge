import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(
    userId: string,
    password: string,
    role: string
  ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      { userId, password, role }
    );
  }

  saveUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('loggedInUser');

    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }
}