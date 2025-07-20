
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AdminStudent {
  name: string;
  email: string;
  branch: string;
  dept: string;
  courses?: string[];
}
export interface AdminFaculty {
  name: string;
  email: string;
  dept: string;
  courses?: string[];
}
export interface AdminCourse {
  name: string;
  credits: number;
  faculty: string;
  dept: string;
}
export interface AdminDepartment {
  name: string;
  head: string;
}

@Component({
  selector: 'app-feature-stub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feature-stub.component.html',
  styleUrls: ['./feature-stub.component.css']
})
export class FeatureStubComponent implements OnInit {
  // --- Student Dashboard: Course Selection State ---
  public studentSelectedCourses: string[] = [];
  public studentCourseSubmitSuccess: boolean = false;
  // Predefined course details for student view
  public studentCourseDetails: AdminCourse[] = [
    { name: 'Algorithms', credits: 4, faculty: 'Dr. Rao', dept: 'Engineering' },
    { name: 'Physics', credits: 3, faculty: 'Dr. Sharma', dept: 'Engineering' },
    { name: 'Mathematics', credits: 4, faculty: 'Dr. Mathur', dept: 'Science' },
    { name: 'English', credits: 2, faculty: 'Ms. Rose', dept: 'Arts' }
  ];
  public submitStudentCourses(): void {
    this.studentCourseSubmitSuccess = true;
    setTimeout(() => { this.studentCourseSubmitSuccess = false; }, 2000);
  }

  // Set feature from dashboard card click
  setAdminFeature(feature: string) {
    this.featureName = feature;
  }
  featureName: string = '';

  // In-memory state for Admin CRUD
  students: AdminStudent[] = [
    { name: 'Alice', email: 'alice@college.edu', branch: 'CSE', dept: 'Engineering', courses: ['Algorithms'] },
    { name: 'Bob', email: 'bob@college.edu', branch: 'CSE', dept: 'Engineering', courses: ['Physics'] }
  ];
  newStudent: AdminStudent = { name: '', email: '', branch: '', dept: '', courses: [] };
  editingStudent: number | null = null;

  facultyList: AdminFaculty[] = [
    { name: 'Dr. Rao', email: 'rao@college.edu', dept: 'Engineering', courses: ['Algorithms'] },
    { name: 'Dr. Sharma', email: 'sharma@college.edu', dept: 'Engineering', courses: ['Physics'] }
  ];
  newFaculty: AdminFaculty = { name: '', email: '', dept: '', courses: [] };
  editingFaculty: number | null = null;

  courses: AdminCourse[] = [
    { name: 'Algorithms', credits: 4, faculty: 'Dr. Rao', dept: 'Engineering' },
    { name: 'Physics', credits: 3, faculty: 'Dr. Sharma', dept: 'Engineering' }
  ];
  newCourse: AdminCourse = { name: '', credits: 0, faculty: '', dept: '' };
  editingCourse: number | null = null;

  departments: AdminDepartment[] = [
    { name: 'Engineering', head: 'Dr. Smith' },
    { name: 'Science', head: 'Dr. Brown' }
  ];
  newDepartment: AdminDepartment = { name: '', head: '' };
  editingDepartment: number | null = null;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    const path = this.route.snapshot.routeConfig?.path ?? '';
    this.featureName = this.getFeatureName(path);
  }

  getFeatureName(path: string): string {
    switch (path) {
      case 'grades': return 'Grades';
      case 'profile': return 'Profile';
      case 'announcements': return 'Announcements';
      case 'support': return 'Support';
      case 'faculty-courses': return 'My Courses';
      case 'student-courses': return 'My Courses'; // <-- Added for student dashboard route
      case 'attendance': return 'Attendance';
      case 'gradebook': return 'Gradebook';
      case 'faculty-profile': return 'Faculty Profile';
      case 'department-info': return 'Department Info';
      case 'department-courses': return 'Course Management';
      case 'reports': return 'Reports';
      case 'students': return 'Students';
      case 'faculty': return 'Faculty';
      case 'courses': return 'Courses';
      case 'departments': return 'Departments';
      case 'settings': return 'Settings';
      default: return 'Feature';
    }
  }

  // CRUD for Students
  addOrUpdateStudent() {
    if (this.editingStudent !== null) {
      this.students[this.editingStudent] = { ...this.newStudent };
      this.editingStudent = null;
    } else {
      this.students.unshift({ ...this.newStudent });
    }
    this.newStudent = { name: '', email: '', branch: '', dept: '', courses: [] };
  }

  removeStudentCourse(course: string) {
    if (this.newStudent.courses) {
      this.newStudent.courses = this.newStudent.courses.filter(c => c !== course);
    }
  }
  editStudent(idx: number) {
    this.editingStudent = idx;
    this.newStudent = { ...this.students[idx] };
  }
  deleteStudent(idx: number) {
    this.students.splice(idx, 1);
    if (this.editingStudent === idx) this.cancelStudentEdit();
  }
  cancelStudentEdit() {
    this.editingStudent = null;
    this.newStudent = { name: '', email: '', branch: '', dept: '' };
  }

  // CRUD for Faculty
  addOrUpdateFaculty() {
    if (this.editingFaculty !== null) {
      this.facultyList[this.editingFaculty] = { ...this.newFaculty };
      this.editingFaculty = null;
    } else {
      this.facultyList.unshift({ ...this.newFaculty });
    }
    this.newFaculty = { name: '', email: '', dept: '', courses: [] };
  }

  removeFacultyCourse(course: string) {
    if (this.newFaculty.courses) {
      this.newFaculty.courses = this.newFaculty.courses.filter(c => c !== course);
    }
  }
  editFaculty(idx: number) {
    this.editingFaculty = idx;
    this.newFaculty = { ...this.facultyList[idx] };
  }
  deleteFaculty(idx: number) {
    this.facultyList.splice(idx, 1);
    if (this.editingFaculty === idx) this.cancelFacultyEdit();
  }
  cancelFacultyEdit() {
    this.editingFaculty = null;
    this.newFaculty = { name: '', email: '', dept: '' };
  }

  // CRUD for Courses
  addOrUpdateCourse() {
    if (this.editingCourse !== null) {
      this.courses[this.editingCourse] = { ...this.newCourse };
      this.editingCourse = null;
    } else {
      this.courses.unshift({ ...this.newCourse });
    }
    this.newCourse = { name: '', credits: 0, faculty: '', dept: '' };
  }
  editCourse(idx: number) {
    this.editingCourse = idx;
    this.newCourse = { ...this.courses[idx] };
  }
  deleteCourse(idx: number) {
    this.courses.splice(idx, 1);
    if (this.editingCourse === idx) this.cancelCourseEdit();
  }
  cancelCourseEdit() {
    this.editingCourse = null;
    this.newCourse = { name: '', credits: 0, faculty: '', dept: '' };
  }

  // CRUD for Departments
  addOrUpdateDepartment() {
    if (this.editingDepartment !== null) {
      this.departments[this.editingDepartment] = { ...this.newDepartment };
      this.editingDepartment = null;
    } else {
      this.departments.unshift({ ...this.newDepartment });
    }
    this.newDepartment = { name: '', head: '' };
  }
  editDepartment(idx: number) {
    this.editingDepartment = idx;
    this.newDepartment = { ...this.departments[idx] };
  }
  deleteDepartment(idx: number) {
    this.departments.splice(idx, 1);
    if (this.editingDepartment === idx) this.cancelDepartmentEdit();
  }
  cancelDepartmentEdit() {
    this.editingDepartment = null;
    this.newDepartment = { name: '', head: '' };
  }
}
