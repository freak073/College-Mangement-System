import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService, Student, StudentRequest } from '../../services/student.service';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  students: Student[] = [];
  studentFormModel: StudentRequest & { id?: number } = {
    studentName: '',
    email: '',
    course: '',
    branch: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    departmentId: 0
  };
  error = '';
  page = 1;
  size = 5;
  totalPages = 1;

  constructor(private readonly studentService: StudentService) {}

  ngOnInit() {
    this.loadPaginatedStudents();
  }

  loadPaginatedStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        // TODO: set totalPages if paginated
      },
      error: () => { this.error = 'Failed to load students.'; }
    });
  }

  onSubmit() {
    if (!this.studentFormModel.id) {
      this.studentService.addStudent(this.studentFormModel).subscribe({
        next: () => { this.loadPaginatedStudents(); this.resetForm(); },
        error: () => { this.error = 'Failed to add student.'; }
      });
    } else {
      this.studentService.updateStudent(this.studentFormModel.id, this.studentFormModel).subscribe({
        next: () => { this.loadPaginatedStudents(); this.resetForm(); },
        error: () => { this.error = 'Failed to update student.'; }
      });
    }
  }

  editStudent(student: Student) {
    this.studentFormModel = {
      id: student.studentId,
      studentName: student.studentName,
      email: student.email,
      course: student.course,
      branch: student.branch,
      address: student.address,
      phoneNumber: student.phoneNumber,
      dateOfBirth: student.dateOfBirth,
      departmentId: this.getDepartmentIdFromName(student.departmentName)
    };
  }

  deleteStudent(id: number) {
    const student = this.students.find(s => s.studentId === id);
    if (student && confirm(`Delete student ${student.studentName}?`)) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => { this.loadPaginatedStudents(); },
        error: () => { this.error = 'Failed to delete student.'; }
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.studentFormModel = {
      studentName: '',
      email: '',
      course: '',
      branch: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      departmentId: 0
    };
  }

  getDepartmentIdFromName(departmentName: string): number {
    // Replace with actual mapping logic or service call
    return 0; // Example placeholder
  }
}
