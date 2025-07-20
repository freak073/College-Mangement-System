import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Department {
  departmentId: number;
  departmentName: string;
  headOfDepartment?: string;
  // Add other fields as needed
}

@Component({
  selector: 'app-admin-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-departments.component.html',
  styleUrls: ['./admin-departments.component.css']
})
export class AdminDepartmentsComponent implements OnInit {
  departments: Department[] = [];
  departmentForm: Partial<Department> = {};
  error = '';
  showForm = false;
  formMode: 'add' | 'edit' = 'add';
  selectedDepartment: Department | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.http.get<Department[]>('/api/departments').subscribe({
      next: (data) => this.departments = data,
      error: () => this.error = 'Failed to load departments.'
    });
  }

  openAddForm() {
    this.formMode = 'add';
    this.departmentForm = {};
    this.showForm = true;
  }

  openEditForm(dept: Department) {
    this.formMode = 'edit';
    this.departmentForm = { ...dept };
    this.selectedDepartment = dept;
    this.showForm = true;
  }

  saveDepartment() {
    if (this.formMode === 'add') {
      this.http.post<Department>('/api/departments', this.departmentForm).subscribe({
        next: () => { this.loadDepartments(); this.cancelForm(); },
        error: () => this.error = 'Failed to add department.'
      });
    } else if (this.formMode === 'edit' && this.selectedDepartment) {
      this.http.put<Department>(`/api/departments/${this.selectedDepartment.departmentId}`, this.departmentForm).subscribe({
        next: () => { this.loadDepartments(); this.cancelForm(); },
        error: () => this.error = 'Failed to update department.'
      });
    }
  }

  deleteDepartment(dept: Department) {
    if (confirm(`Delete department ${dept.departmentName}?`)) {
      this.http.delete(`/api/departments/${dept.departmentId}`).subscribe({
        next: () => this.loadDepartments(),
        error: () => this.error = 'Failed to delete department.'
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedDepartment = null;
    this.departmentForm = {};
  }
}
