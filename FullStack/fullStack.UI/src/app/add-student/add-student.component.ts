import { Component, OnInit } from '@angular/core';
import { Student } from '../models/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  addStudentRequest: Student = {
    id: '',
    firstName: '',
    lastName: '',
    major: '',
    gend: '',
    dob: new Date(),
  };

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {}

  addStudent() {
    //console.log(this.addStudentRequest);
    this.studentService.addStudents(this.addStudentRequest).subscribe({
      next: (student) => {
        console.log(student);
      },
    });
  }
}
