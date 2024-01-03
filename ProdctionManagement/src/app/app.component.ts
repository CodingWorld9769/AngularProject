import { Component, NgModule } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { EnviromentUrlsService } from './shared/service/enviroment-urls.service';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    ProductComponent,
    AddProductComponent,
    OrderListComponent,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    FormsModule,
  ],
  providers: [EnviromentUrlsService],
})
export class AppComponent {
  title = 'ProdctionManagement';
}
