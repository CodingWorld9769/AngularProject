import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { order } from '../Model/Order.model';
import { DatePipe } from '@angular/common';
import { EnviromentUrlsService } from '../shared/service/enviroment-urls.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    EditOrderComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent implements OnInit {
  listOfOrder: order[] = [];

  constructor(private service: EnviromentUrlsService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllOrders().subscribe((response) => {
      this.listOfOrder = response;
      console.log(response);
    });
  }

  deleteOrder(id: number) {
    this.service.deleteOrder(id).subscribe((response) => {
      console.log(response);
    });
  }
}
