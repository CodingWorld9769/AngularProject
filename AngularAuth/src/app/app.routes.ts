import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { AddSellerComponent } from './components/add-seller/add-seller.component';
import { EditSellerComponent } from './components/edit-seller/edit-seller.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { AddReviewsComponent } from './components/add-reviews/add-reviews.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'reset',
    component: ResetComponent,
  },
  {
    path: 'AddSeller',
    component: AddSellerComponent,
  },
  {
    path: 'dashboard/editSeller/:id',
    component: EditSellerComponent,
  },
  {
    path: 'product-list/:id',
    component: ProductListComponent,
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
  },
  {
    path: 'ProductDetail',
    component: ProductDetailComponent,
  },
  {
    path:'EditProduct', component:EditProductComponent
  },
  {
    path:'addReview', component:AddReviewsComponent
  },
  
];
