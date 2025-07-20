import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AttendanceRecord {
  date: string;
  course: string;
  class: string;
  student: string;
  status: 'Present' | 'Absent';
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  courses = ['Algorithms', 'Data Structures', 'DBMS'];
  classes: { [key: string]: string[] } = {
    Algorithms: ['A', 'B'],
    'Data Structures': ['A'],
    DBMS: ['A', 'B', 'C']
  };

  attendance: AttendanceRecord[] = [
    { date: '2025-07-01', course: 'Algorithms', class: 'A', student: 'Alice', status: 'Present' },
    { date: '2025-07-01', course: 'Algorithms', class: 'A', student: 'Bob', status: 'Absent' }
  ];

  selectedCourse = '';
  selectedClass = '';

  newRecord: AttendanceRecord = this.getEmptyRecord();
  editingIndex: number | null = null;

  getAvailableClasses(): string[] {
    return this.selectedCourse ? this.classes[this.selectedCourse] || [] : [];
  }

  getEmptyRecord(): AttendanceRecord {
    return {
      date: '',
      course: '',
      class: '',
      student: '',
      status: 'Present'
    };
  }

  isValidRecord(record: AttendanceRecord): boolean {
    return !!(record.date && record.course && record.class && record.student);
  }

  addRecord(): void {
    if (this.isValidRecord(this.newRecord)) {
      this.attendance.push({ ...this.newRecord });
      this.resetForm();
    }
  }

  editRecord(index: number): void {
    this.editingIndex = index;
    this.newRecord = { ...this.attendance[index] };
    this.selectedCourse = this.newRecord.course;
    this.selectedClass = this.newRecord.class;
  }

  updateRecord(): void {
    if (this.editingIndex !== null && this.isValidRecord(this.newRecord)) {
      this.attendance[this.editingIndex] = { ...this.newRecord };
      this.resetForm();
    }
  }

  deleteRecord(index: number): void {
    this.attendance.splice(index, 1);
    if (this.editingIndex === index) this.resetForm();
  }

  resetForm(): void {
    this.newRecord = this.getEmptyRecord();
    this.editingIndex = null;
    this.selectedCourse = '';
    this.selectedClass = '';
  }
}
