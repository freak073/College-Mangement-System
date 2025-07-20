import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.errorMsg = '';
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.errorMsg = 'Please enter username and password.';
      return;
    }
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        if (res && res.token && res.role) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          // Redirect based on role returned from backend (handles ROLE_ prefix)
          if (res.role === 'ROLE_ADMIN') this.router.navigate(['/admin-dashboard']);
          else if (res.role === 'ROLE_FACULTY') this.router.navigate(['/faculty-dashboard']);
          else if (res.role === 'ROLE_DEPARTMENT') this.router.navigate(['/department-dashboard']);
          else this.router.navigate(['/student-dashboard']);
        } else {
          this.errorMsg = 'Invalid response from server.';
        }
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Invalid credentials or server error.';
      }
    });
  }

  getRoleIcon(): string {
    const role = localStorage.getItem('role');
    switch (role) {
      case 'ROLE_ADMIN': return 'bi-shield-lock';
      case 'ROLE_FACULTY': return 'bi-person-badge';
      case 'ROLE_DEPARTMENT': return 'bi-building';
      default: return 'bi-person-circle';
    }
  }

  getRoleHeading(): string {
    const role = localStorage.getItem('role');
    switch (role) {
      case 'ROLE_ADMIN': return 'Admin Login';
      case 'ROLE_FACULTY': return 'Faculty Login';
      case 'ROLE_DEPARTMENT': return 'Department Login';
      default: return 'Student Login';
    }
  }
}
