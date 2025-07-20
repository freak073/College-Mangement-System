import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Student {
  studentId: number;
  studentName: string;
  email: string;
  course: string;
  branch: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  departmentName: string;
}

export interface StudentRequest {
  studentName: string;
  email: string;
  course: string;
  branch: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  departmentId: number;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = environment.apiUrl + '/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: StudentRequest): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: StudentRequest): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
