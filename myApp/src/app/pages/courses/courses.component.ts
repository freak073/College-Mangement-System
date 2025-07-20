import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  showForm = false;
  formMode: 'add' | 'edit' = 'add';
  formData: { courseName: string; credits: string; durations: string; facultyId: number } = {
    courseName: '',
    credits: '',
    durations: '',
    facultyId: 0
  };
  error = '';

  constructor(private readonly courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => { this.courses = data; },
      error: () => { this.error = 'Failed to load courses.'; }
    });
  }

  openAddForm() {
    this.formMode = 'add';
    this.formData = { courseName: '', credits: '', durations: '', facultyId: 0 };
    this.showForm = true;
    this.selectedCourse = null;
  }

  openEditForm(course: Course) {
    this.formMode = 'edit';
    this.formData = {
      courseName: course.courseName || '',
      credits: course.credits || '',
      durations: course.durations || '',
      facultyId: course.facultyId || 0
    };
    this.selectedCourse = course;
    this.showForm = true;
  }

  saveCourse() {
    const payload = {
      courseName: this.formData.courseName,
      credits: this.formData.credits,
      durations: this.formData.durations,
      facultyId: this.formData.facultyId
    };
    if (this.formMode === 'add') {
      this.courseService.addCourse(payload as any).subscribe({
        next: () => { this.loadCourses(); this.showForm = false; },
        error: () => { this.error = 'Failed to add course.'; }
      });
    } else if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse.courseId, payload as any).subscribe({
        next: () => { this.loadCourses(); this.showForm = false; },
        error: () => { this.error = 'Failed to update course.'; }
      });
    }
  }

  deleteCourse(course: Course) {
    if (confirm(`Delete course ${course.courseName}?`)) {
      this.courseService.deleteCourse(course.courseId).subscribe({
        next: () => { this.loadCourses(); },
        error: () => { this.error = 'Failed to delete course.'; }
      });
    }
    this.selectedCourse = null;
  }

  cancelForm() {
    this.showForm = false;
    this.selectedCourse = null;
  }
}
