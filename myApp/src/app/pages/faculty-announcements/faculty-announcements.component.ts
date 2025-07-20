
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
export interface Announcement {
  title: string;
  date: string;
  msg: string;
}

@Component({
  selector: 'app-faculty-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty-announcements.component.html',
  styleUrls: ['./faculty-announcements.component.css']
})
export class FacultyAnnouncementsComponent {
  announcements: Announcement[] = [
    { title: 'Exam Schedule', date: '2025-07-01', msg: 'Final exams start July 15.' },
    { title: 'Holiday Notice', date: '2025-06-20', msg: 'College closed on June 21.' }
  ];

  newAnnouncement: Announcement = { title: '', date: '', msg: '' };
  editIndex: number | null = null;

  addOrUpdateAnnouncement() {
    if (this.editIndex !== null) {
      this.announcements[this.editIndex] = { ...this.newAnnouncement };
      this.editIndex = null;
    } else {
      this.announcements.unshift({ ...this.newAnnouncement });
    }
    this.newAnnouncement = { title: '', date: '', msg: '' };
  }

  editAnnouncement(idx: number) {
    this.editIndex = idx;
    this.newAnnouncement = { ...this.announcements[idx] };
  }

  deleteAnnouncement(idx: number) {
    this.announcements.splice(idx, 1);
    if (this.editIndex === idx) {
      this.editIndex = null;
      this.newAnnouncement = { title: '', date: '', msg: '' };
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.newAnnouncement = { title: '', date: '', msg: '' };
  }
}
