import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Faculty {
  facultyId: number;
  facultyName: string;
  designation: string;
  email: string;
  phoneNumber: string;
  specialization: string;
}

export interface FacultyRequest {
  facultyName: string;
  email: string;
  specialization: string;
  phoneNumber: string;
  designation: string;
}

export interface PaginatedFaculty {
  content: Faculty[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class FacultyService {
  private apiUrl = '/api/faculties';

  constructor(private http: HttpClient) {}

  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.apiUrl);
  }

  getFaculty(id: number): Observable<Faculty> {
    return this.http.get<Faculty>(`${this.apiUrl}/${id}`);
  }

  addFaculty(faculty: FacultyRequest): Observable<Faculty> {
    return this.http.post<Faculty>(this.apiUrl, faculty);
  }

  updateFaculty(id: number, faculty: FacultyRequest): Observable<Faculty> {
    return this.http.put<Faculty>(`${this.apiUrl}/${id}`, faculty);
  }

  deleteFaculty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPaginatedFaculties(page: number = 0, size: number = 5, sortBy: string = 'facultyId', direction: string = 'asc'): Observable<PaginatedFaculty> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);
    return this.http.get<PaginatedFaculty>(`${this.apiUrl}/paginated`, { params });
  }
}
