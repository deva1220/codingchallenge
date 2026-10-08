import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userId = '';
  password = '';
  role = 'General User';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';

    if (!this.userId || !this.password || !this.role) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.loading = true;

    this.authService.login(
      this.userId,
      this.password,
      this.role
    ).subscribe({
      next: (response) => {
        this.loading = false;

        this.authService.saveUser(response.user);

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        this.loading = false;

        this.errorMessage =
          error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}