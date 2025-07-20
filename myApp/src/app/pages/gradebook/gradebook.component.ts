import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface GradeRecord {
  course: string;
  class: string;
  student: string;
  grade: string;
}

@Component({
  selector: 'app-gradebook',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent {
  courses = ['Algorithms', 'Data Structures', 'DBMS'];
  classes: { [key: string]: string[] } = {
    Algorithms: ['A', 'B'],
    'Data Structures': ['A'],
    DBMS: ['A', 'B', 'C']
  };
  students: { [courseClass: string]: string[] } = {
    'Algorithms|A': ['Alice', 'Bob'],
    'Algorithms|B': ['Charlie'],
    'Data Structures|A': ['Alice', 'David'],
    'DBMS|A': ['Eve'],
    'DBMS|B': ['Frank'],
    'DBMS|C': ['Grace']
  };

  gradebook: GradeRecord[] = [
    { course: 'Algorithms', class: 'A', student: 'Alice', grade: 'A' },
    { course: 'Algorithms', class: 'A', student: 'Bob', grade: 'B+' }
  ];

  selectedCourse = '';
  selectedClass = '';
  newRecord: GradeRecord = this.getEmptyRecord();
  editingIndex: number | null = null;

  getAvailableClasses(): string[] {
    return this.selectedCourse ? this.classes[this.selectedCourse] || [] : [];
  }

  getAvailableStudents(): string[] {
    if (this.selectedCourse && this.selectedClass) {
      return this.students[`${this.selectedCourse}|${this.selectedClass}`] || [];
    }
    return [];
  }

  getEmptyRecord(): GradeRecord {
    return { course: '', class: '', student: '', grade: '' };
  }

  isValidRecord(record: GradeRecord): boolean {
    return !!(record.course && record.class && record.student && record.grade);
  }

  addRecord(): void {
    if (this.isValidRecord(this.newRecord)) {
      this.gradebook.push({ ...this.newRecord });
      this.resetForm();
    }
  }

  editRecord(index: number): void {
    this.editingIndex = index;
    this.newRecord = { ...this.gradebook[index] };
    this.selectedCourse = this.newRecord.course;
    this.selectedClass = this.newRecord.class;
  }

  updateRecord(): void {
    if (this.editingIndex !== null && this.isValidRecord(this.newRecord)) {
      this.gradebook[this.editingIndex] = { ...this.newRecord };
      this.resetForm();
    }
  }

  deleteRecord(index: number): void {
    this.gradebook.splice(index, 1);
    if (this.editingIndex === index) this.resetForm();
  }

  resetForm(): void {
    this.newRecord = this.getEmptyRecord();
    this.editingIndex = null;
    this.selectedCourse = '';
    this.selectedClass = '';
  }
}
