import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ManagedUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  users: ManagedUser[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.apiUrl);
  }

  addUser(user: {
    userId: string;
    password: string;
    name: string;
    email: string;
    role: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}