
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FacultyService, Faculty, FacultyRequest, PaginatedFaculty } from '../../services/faculty.service';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[] = [];
  facultyFormModel: FacultyRequest & { id?: number } = {
    facultyName: '',
    email: '',
    specialization: '',
    phoneNumber: '',
    designation: ''
  };
  error = '';
  page = 1;
  size = 5;
  totalPages = 1;

  constructor(private readonly facultyService: FacultyService) {}

  ngOnInit() {
    this.loadPaginatedFaculties();
  }

  loadPaginatedFaculties() {
    this.facultyService.getPaginatedFaculties(this.page - 1, this.size, 'facultyId', 'asc').subscribe({
      next: (data) => {
        this.faculties = data.content;
        this.totalPages = data.totalPages;
      },
      error: () => { this.error = 'Failed to load faculties.'; }
    });
  }

  openAddForm() {
    this.facultyFormModel = {
      facultyName: '',
      email: '',
      specialization: '',
      phoneNumber: '',
      designation: ''
    };
  }

  openEditForm(faculty: Faculty) {
    this.facultyFormModel = {
      id: faculty.facultyId,
      facultyName: faculty.facultyName,
      email: faculty.email,
      specialization: faculty.specialization,
      phoneNumber: faculty.phoneNumber,
      designation: faculty.designation
    };
  }

  saveFaculty() {
    if (!this.facultyFormModel.id) {
      // Add
      const req: FacultyRequest = {
        facultyName: this.facultyFormModel.facultyName,
        email: this.facultyFormModel.email,
        specialization: this.facultyFormModel.specialization,
        phoneNumber: this.facultyFormModel.phoneNumber,
        designation: this.facultyFormModel.designation
      };
      this.facultyService.addFaculty(req).subscribe({
        next: () => { this.loadPaginatedFaculties(); this.resetForm(); },
        error: () => { this.error = 'Failed to add faculty.'; }
      });
    } else {
      // Edit
      const req: FacultyRequest = {
        facultyName: this.facultyFormModel.facultyName,
        email: this.facultyFormModel.email,
        specialization: this.facultyFormModel.specialization,
        phoneNumber: this.facultyFormModel.phoneNumber,
        designation: this.facultyFormModel.designation
      };
      this.facultyService.updateFaculty(this.facultyFormModel.id, req).subscribe({
        next: () => { this.loadPaginatedFaculties(); this.resetForm(); },
        error: () => { this.error = 'Failed to update faculty.'; }
      });
    }
  }

  // ...existing code...

  cancelForm() {
    this.resetForm();
  }

  goToPage(page: number) {
    this.page = page;
    this.loadPaginatedFaculties();
  }

  // --- HTML Template Methods ---
  onSubmit() {
    this.saveFaculty();
  }

  resetForm() {
    this.facultyFormModel = {
      facultyName: '',
      email: '',
      specialization: '',
      phoneNumber: '',
      designation: ''
    };
  }

  editFaculty(faculty: Faculty) {
    this.facultyFormModel = {
      id: faculty.facultyId,
      facultyName: faculty.facultyName,
      email: faculty.email,
      specialization: faculty.specialization,
      phoneNumber: faculty.phoneNumber,
      designation: faculty.designation
    };
  }

  deleteFaculty(id: number) {
    const faculty = this.faculties.find(f => f.facultyId === id);
    if (faculty) {
      if (confirm(`Delete faculty ${faculty.facultyName}?`)) {
        this.facultyService.deleteFaculty(faculty.facultyId).subscribe({
          next: () => { this.loadPaginatedFaculties(); },
          error: () => { this.error = 'Failed to delete faculty.'; }
        });
      }
      this.resetForm();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPaginatedFaculties();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPaginatedFaculties();
    }
  }
}
