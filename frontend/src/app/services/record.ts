import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecordItem {
  id: string;
  name: string;
  department: string;
  status: string;
  owner: string;
}

export interface RecordsResponse {
  success: boolean;
  count: number;
  records: RecordItem[];
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = 'http://localhost:3000/api/records';

  constructor(private http: HttpClient) {}

  getRecords(
    userId: string,
    role: string,
    delay: number = 2000
  ): Observable<RecordsResponse> {

    return this.http.get<RecordsResponse>(
      `${this.apiUrl}?userId=${encodeURIComponent(userId)}&role=${encodeURIComponent(role)}&delay=${delay}`
    );
  }
}