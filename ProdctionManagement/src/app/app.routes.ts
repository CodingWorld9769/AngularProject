import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditComponent } from './edit/edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

export const routes: Routes = [
  //   {
  //     path: '',
  //     component: AppComponent,
  //   },
  {
    path: 'Product',
    component: ProductComponent,
  },
  {
    path: 'AddProduct',
    component: AddProductComponent,
  },
  {
    path: 'Product/EditProduct/:id',
    component: EditComponent,
  },
  {
    path: 'Order',
    component: OrderListComponent,
  },
  {
    path: 'AddOrder',
    component: AddOrderComponent,
  },
  {
    path: 'Order/EditOrder/:id',
    component: EditOrderComponent,
  },
  { path: 'welcome', component: WelcomepageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Redirect to welcome page by default
];
