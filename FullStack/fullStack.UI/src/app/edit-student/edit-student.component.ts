import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/students.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  studentDetails: Student = {
    id: '',
    firstName: '',
    lastName: '',
    major: '',
    gend: '',
    dob: new Date(),
  };
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (Params) => {
        const id = Params.get('id');

        if (id) {
          //call the api
          this.studentService.getEmployee(id).subscribe({
            next: (response) => {
              this.studentDetails = response;
            },
          });
        }
      },
    });
  }

  updateStudent() {
    this.studentService
      .updateStudent(this.studentDetails.id, this.studentDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['students']);
        },
      });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe({
      next: (response) => {
        this.router.navigate(['students']);
      },
    });
  }
}
