import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.baseApiUrl}/api/SchoolManagement/GetStudent`
    );
  }
}
