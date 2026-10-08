import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, ManagedUser } from '../../services/user';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users: ManagedUser[] = [];

  loading = true;
  errorMessage = '';

  showForm = false;
  editingUser: ManagedUser | null = null;

  formData = {
    userId: '',
    password: '',
    name: '',
    email: '',
    role: 'General User'
  };

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load users.';
        this.cdr.detectChanges();
      }
    });
  }

  openAddForm(): void {
    this.editingUser = null;

    this.formData = {
      userId: '',
      password: '',
      name: '',
      email: '',
      role: 'General User'
    };

    this.showForm = true;
  }

  openEditForm(user: ManagedUser): void {
    this.editingUser = user;

    this.formData = {
      userId: user.userId,
      password: '',
      name: user.name,
      email: user.email,
      role: user.role
    };

    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingUser = null;
  }

  saveUser(): void {

    if (
      !this.formData.userId ||
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.role
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (!this.editingUser && !this.formData.password) {
      this.errorMessage = 'Password is required for a new user.';
      return;
    }

    if (this.editingUser) {

      const updateData: any = {
        userId: this.formData.userId,
        name: this.formData.name,
        email: this.formData.email,
        role: this.formData.role
      };

      if (this.formData.password) {
        updateData.password = this.formData.password;
      }

      this.userService
        .updateUser(this.editingUser.id, updateData)
        .subscribe({
          next: () => {
            this.closeForm();
            this.loadUsers();
          },

          error: (error) => {
            this.errorMessage =
              error.error?.message || 'Unable to update user.';
          }
        });

    } else {

      this.userService
        .addUser(this.formData)
        .subscribe({
          next: () => {
            this.closeForm();
            this.loadUsers();
          },

          error: (error) => {
            this.errorMessage =
              error.error?.message || 'Unable to create user.';
          }
        });
    }
  }

  deleteUser(user: ManagedUser): void {

    const confirmed = confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.loadUsers();
      },

      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Unable to delete user.';
      }
    });
  }
}