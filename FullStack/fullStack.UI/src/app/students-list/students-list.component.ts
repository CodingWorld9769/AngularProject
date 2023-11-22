import { Component, OnInit } from '@angular/core';
import { Student } from '../models/students.model';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  //creating a static list
  students: Student[] = [];

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    //display the data when student tab is hit
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        console.log(students);
        this.students = students;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
