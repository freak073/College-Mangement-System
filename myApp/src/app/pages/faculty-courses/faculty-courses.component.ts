import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Course {
  name: string;
  credits: number;
  department: string;
}

@Component({
  selector: 'app-faculty-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty-courses.component.html',
  styleUrls: ['./faculty-courses.component.css']
})
export class FacultyCoursesComponent {
  courses: Course[] = [
    { name: 'Algorithms', credits: 4, department: 'CSE' },
    { name: 'Data Structures', credits: 3, department: 'CSE' }
  ];

  editingIndex: number|null = null;
  newCourse: Course = { name: '', credits: 0, department: '' };
  selectedCourse: Course | null = null;


  addCourse() {
    if (this.newCourse.name && this.newCourse.credits && this.newCourse.department) {
      this.courses.push({ ...this.newCourse });
      this.newCourse = { name: '', credits: 0, department: '' };
    }
  }


  editCourse(i: number) {
    this.editingIndex = i;
    this.newCourse = { ...this.courses[i] };
    this.selectedCourse = null;
  }


  updateCourse() {
    if (this.editingIndex !== null) {
      this.courses[this.editingIndex] = { ...this.newCourse };
      this.editingIndex = null;
      this.newCourse = { name: '', credits: 0, department: '' };
    }
  }

  deleteCourse(i: number) {
    this.courses.splice(i, 1);
    if (this.editingIndex === i) this.editingIndex = null;
    if (this.selectedCourse && this.selectedCourse === this.courses[i]) {
      this.selectedCourse = null;
    }
  }

  viewCourse(course: Course) {
    this.selectedCourse = course;
    // Open Bootstrap modal
    const modal: any = document.getElementById('viewCourseModal');
    if (modal) {
      // Bootstrap 5 modal (fix TS7015 by casting window as any)
      const win = window as any;
      const bsModal = win.bootstrap?.Modal ? new win.bootstrap.Modal(modal) : null;
      if (bsModal) bsModal.show();
      else modal.style.display = 'block';
    }
  }
}
