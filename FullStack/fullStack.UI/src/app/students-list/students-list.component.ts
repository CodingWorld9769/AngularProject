import { Component, OnInit } from '@angular/core';
import { Student } from '../models/students.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  //creating a static list
  students: Student[] = [
    {
      id: 'SO1',
      name: 'john Doe',
      major: 'MIS',
      gender: 'F',
      DOB: '12/2/2023',
    },
    {
      id: 'SO2',
      name: 'Sameer saini',
      major: 'Acct',
      gender: 'M',
      DOB: '1/12/2022',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    //display the data when student tab is hit
  }
}
