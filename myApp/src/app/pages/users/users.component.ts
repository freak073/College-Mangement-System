
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<{ id?: number; username: string; name: string; email: string; phone: string; password?: string; role?: string; roles?: string[] }> = [];
  errorMsg: string = '';
  showForm: boolean = false;
  isEdit: boolean = false;
  formUser: { id?: number; username: string; name: string; email: string; phone: string; password?: string; role?: string; roles?: string[] } = { username: '', name: '', email: '', phone: '', password: '', role: 'STUDENT' };
  selectedUserId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: any[]) => this.users = data,
      error: (err: any) => this.errorMsg = 'Failed to load users.'
    });
  }

  openAddForm() {
    this.showForm = true;
    this.isEdit = false;
    this.formUser = { username: '', name: '', email: '', phone: '', password: '', role: 'STUDENT' };
    this.selectedUserId = null;
  }

  openEditForm(user: any) {
    this.showForm = true;
    this.isEdit = true;
    this.formUser = { ...user, password: '' };
    this.selectedUserId = user.id;
  }

  saveUser() {
    if (this.isEdit && this.selectedUserId != null) {
      const updatedUser = { ...this.formUser, id: this.selectedUserId };
      this.userService.editUser(updatedUser).subscribe({
        next: () => {
          this.showForm = false;
          this.loadUsers();
        },
        error: (err: any) => this.errorMsg = 'Failed to update user.'
      });
    } else {
      this.userService.addUser(this.formUser).subscribe({
        next: () => {
          this.showForm = false;
          this.loadUsers();
        },
        error: (err: any) => this.errorMsg = 'Failed to add user.'
      });
    }
  }

  deleteUser(id: number | undefined) {
    if (typeof id !== 'number') return;
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err: any) => this.errorMsg = 'Failed to delete user.'
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.formUser = { username: '', name: '', email: '', phone: '', password: '', role: 'STUDENT' };
    this.selectedUserId = null;
  }
}
