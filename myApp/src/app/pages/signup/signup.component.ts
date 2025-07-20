import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  name = '';
  phone = '';
  password = '';
  email = '';
  role = 'STUDENT';
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (
      !this.username.trim() ||
      !this.password.trim() ||
      !this.email.trim() ||
      !this.role.trim() ||
      !this.name.trim() ||
      !this.phone.trim()
    ) {
      this.errorMsg = 'Please fill all fields.';
      return;
    }
    this.authService.signup({
      username: this.username,
      name: this.name,
      phone: this.phone,
      password: this.password,
      email: this.email,
      role: this.role
    }).subscribe({
      next: () => {
        this.successMsg = 'Signup successful! Please login.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        if (err?.error?.message && err.error.message.includes('Username already exists')) {
          this.errorMsg = 'Username already exists, please choose another.';
        } else {
          this.errorMsg = err?.error?.message || 'Signup failed.';
        }
      }
    });
  }
}
