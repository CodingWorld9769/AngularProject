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

  addStudents(addStudentRequest: Student): Observable<Student> {
    return this.http.post<any>(
      this.baseApiUrl + '/api/SchoolManagement/AddStudent',
      addStudentRequest
    );
  }
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.baseApiUrl}/api/SchoolManagement/GetStudent`
    );
  }

  getEmployee(id: string): Observable<Student> {
    return this.http.get<Student>(
      this.baseApiUrl + '/api/SchoolManagement/GetStudent/' + id
    );
  }

  updateStudent(
    id: string,
    updateStudentRequest: Student
  ): Observable<Student> {
    return this.http.put<Student>(
      this.baseApiUrl + '/api/SchoolManagement/PutStudent/' + id,
      updateStudentRequest
    );
  }

  deleteStudent(id: string): Observable<Student> {
    return this.http.delete<any>(
      this.baseApiUrl + '/api/SchoolManagement/DeleteStudent/' + id
    );
  }
}
