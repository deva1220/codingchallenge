import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService, User } from '../../services/auth';
import { RecordService, RecordItem } from '../../services/record';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  user: User | null = null;

  records: RecordItem[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private recordService: RecordService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.user = this.authService.getUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadRecords();
  }

  loadRecords(): void {

    if (!this.user) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.recordService.getRecords(
      this.user.userId,
      this.user.role,
      2000
    ).subscribe({

      next: (response) => {
        this.records = response.records;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load records.';
        this.cdr.detectChanges();
      }

    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}