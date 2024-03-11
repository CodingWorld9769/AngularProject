import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Product } from '../../../models/Product.model';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UserStoreService } from '../../../services/user-store.service';
import { ProductService } from '../../../shared/product.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  listOfProduct: Product[] = [];
  brandName: string = 'Productify';
  public role: string = '';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private productService: ProductService,
    private reviewService:ReviewService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Check if idParam is not null or undefined
    if (idParam != null) {
      // Parse the ID to a number
      const sellerId = +idParam;
      console.log(sellerId);

      //call the api to get the prouct under this ID
      this.service.getProducts(sellerId).subscribe((res) => {
        this.listOfProduct = res;
        console.log(this.listOfProduct);
      });
    }

    //to check id the user is admin or normal user
    this.userStore.getRoleFromStore().subscribe((role) => {
      let roleFromToken = this.auth.getRoleFromToke();
      this.role = role || roleFromToken;
    });

    //call the review api to get the reviews and the user id
    
    
  }

  onProductClicked(product: Product) {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/ProductDetail']);
  }

  logout() {
    this.auth.signOut();
  }
}
