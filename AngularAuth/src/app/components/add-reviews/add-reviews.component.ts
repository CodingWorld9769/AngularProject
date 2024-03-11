import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/Product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ReviewService } from '../../services/review.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-reviews',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-reviews.component.html',
  styleUrl: './add-reviews.component.css'
})
export class AddReviewsComponent implements OnInit {
  product:Product | undefined;
  public fullName: string = '';
  Id  : number = 0; //userID
  brandName: string = 'Productify';
  AddReviewForm!: FormGroup;
  constructor(private toastr: NgToastService,private router:Router, private reviewService:ReviewService, private api:ApiService, private cdr: ChangeDetectorRef,private userStore: UserStoreService, private auth: AuthService,private fb: FormBuilder, private route:ActivatedRoute) {
   
    
  }
  ngOnInit(): void {

   this.AddReviewForm = this.fb.group({
      productId : ['', Validators.required],
      Id : ['', Validators.required],
      text: ['', Validators.required],
      rating:['',Validators.required]
   })


      //initialing the service here
      this.userStore.getFullNameFromStore().subscribe((val) => {
        //we can the name from auth service as well
        let fullNameFromToken = this.auth.getfullNameFromToken();
        //when we get the first time name it will be coming from the observble
        //but when we refresh the page observale will be empty and now  we will get the
        //fullname from the token
        this.fullName = val || fullNameFromToken;
        this.cdr.detectChanges()
        
      });
       
      //trying to bind the parent field with the child field using queryParams
      this.route.queryParams.subscribe(params =>{
        this.product = JSON.parse(params['product']); //json.parse  converting the string back to object
        this.cdr.detectChanges() //triger change detection
      })
     

      //getUserId by userName
      
    this.getUserId(this.fullName);

  }
  
  getUserId(userName: string){
    this.api.getUserIdByUserName(userName).subscribe((res:any ) =>{
      //console.log(res);
      
      this.Id = res?.userId;
      console.log(this.Id);
    })
  }
  
  onSubmit() {
    if(this.AddReviewForm.valid){
      const formData  = this.AddReviewForm.value;
      this.reviewService.addReview(formData).subscribe({
        next:(res) => {
          this.toastr.success({
            detail: 'Success',
            summary: 'Review added successfully',
            duration: 5000,
          });
          this.router.navigate(['/ProductDetail']);

        },
        error:(err)=>{
          this.toastr.error({
            detail: 'Error',
            summary: 'Something went wrong',
            duration: 5000,
          });
          console.log(err);
        }
      })
      console.log(formData);
    }
    else {
      console.log("not submitted");
      console.log(this.AddReviewForm.controls);
    }
   
    }
    logout() {
    
    }
}
