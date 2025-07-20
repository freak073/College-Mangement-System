import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


export interface FacultyProfile {
  name: string;
  email: string;
  designation: string;
  specialization: string;
  phone: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-faculty-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty-profile.component.html',
  styleUrls: ['./faculty-profile.component.css']
})
export class FacultyProfileComponent {
  profile: FacultyProfile = {
    name: 'Dr. Rao',
    email: 'rao@college.edu',
    designation: 'Professor',
    specialization: 'Algorithms',
    phone: '9876543210',
    avatarUrl: 'https://ui-avatars.com/api/?name=Dr.+Rao&background=6366f1&color=fff&size=128'
  };

  editMode = false;
  tempProfile: FacultyProfile = { ...this.profile };

  startEdit() {
    this.tempProfile = { ...this.profile };
    this.editMode = true;
  }

  saveProfile() {
    this.profile = { ...this.tempProfile };
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
