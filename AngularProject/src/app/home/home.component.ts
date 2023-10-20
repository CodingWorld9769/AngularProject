import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public homeText: string = '';

  constructor() {}

  //ngOnInit function for writing any logic when the componenet is initialized
  ngOnInit(): void {
    //setting the property value i.e hometext to "welcome ...."
    this.homeText = 'Welcome to Account-Owner Application';
  }
}
