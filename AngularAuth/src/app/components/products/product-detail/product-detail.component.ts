import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/product.service';
import { Product } from '../../../models/Product.model';
import { ReviewService } from '../../../services/review.service';
import { Review } from '../../../models/Review.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddReviewsComponent } from "../../add-reviews/add-reviews.component";

@Component({
    selector: 'app-product-detail',
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
    imports: [CommonModule, RouterLink, AddReviewsComponent]
})
export class ProductDetailComponent implements OnInit {


  product: Product | undefined;
  // reviews: Review = {
  //   reviewId:0,
  //   text: '',
  //   rating:0,
  //   userName:'',
  //   productId:0

  // }
  reviews : Review[] = []

  constructor(private productService: ProductService, private reviewService: ReviewService,private router:Router) {}
  ngOnInit(): void {
    this.productService.setSelectedProduct$.subscribe((product) => {
      console.log(product);
      this.product = product;
    });
    this.reviewService.getReviews(this.product?.productId).subscribe({
      next:(res)=>{
        console.log(res);
        this.reviews = res;
      },
      error :(err)=>{
        console.error('Error loading reviews:', err);

      }
    })
  }
  
  //this method pass the product id to addReview component
  navigateToAddReview(product: any) {
    //this.router.navigate(['addReview',productId ]);
    console.log("hello",product);
    //stringify the product so that object is converted into string queryParam takes a string and 
    //then when the query param is retrived it 
    //it convert the query param back to javascript object 
    this.router.navigate(['/addReview'], { queryParams: { product: JSON.stringify(product) } });
    }
  
}
