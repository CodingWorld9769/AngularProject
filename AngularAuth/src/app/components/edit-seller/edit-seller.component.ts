import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Seller } from '../../models/Seller.model';
import {
  ActivatedRoute,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { response } from 'express';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-seller',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    NgToastModule,
    FormsModule,
  ],
  templateUrl: './edit-seller.component.html',
  styleUrl: './edit-seller.component.css',
})
export class EditSellerComponent implements OnInit {
  newSeller: Seller = {
    sellerId: 0,
    name: '',
    description: '',
    contactInformation: '',
  };
  brandName: string = 'Productify';
  EditForm!: FormGroup;
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    private fb: FormBuilder,
    private toastr: NgToastService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Get the id from the route
    const idParam = this.route.snapshot.paramMap.get('id');

    // Check if idParam is not null or undefined
    if (idParam != null) {
      // Parse the ID to a number
      const sellerId = +idParam;

      // Call the getSellerById service
      this.service.getSellerById(sellerId).subscribe({
        next: (res) => {
          this.newSeller = res;
          console.log(this.newSeller);
          this.initForm();
        },
      });
    } else {
      console.error('Seller ID is null or undefined');
    }
    // this.initForm();
  }

  initForm() {
    this.EditForm = this.fb.group({
      name: [this.newSeller.name, Validators.required],

      description: [this.newSeller.description, Validators.required],
      contactInformation: [
        this.newSeller.contactInformation,
        Validators.required,
      ],
    });
    console.log('Form Values:', this.EditForm.value);
  }
  onSubmit() {
    debugger;
    if (this.EditForm.valid) {
      const formData = this.EditForm.value;
      console.log(formData);
      //update the seller details
      this.newSeller.name = formData.name;
      this.newSeller.description = formData.description;
      this.newSeller.contactInformation = formData.contactInformation;

      this.service
        .updateSeller(this.newSeller.sellerId, this.newSeller)
        .subscribe({
          next: (res) => {
            console.log('Seller Edited successfully', res);
            this.toastr.success({
              detail: 'Success',
              summary: 'Seller Edited successfully',
              duration: 5000,
            });
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.toastr.error({
              detail: 'Error',
              summary: 'Something went wrong',
              duration: 5000,
            });
            console.log(err);
            //this.toastr.warning('Login failed');
          },
        });
    }
  }
  logout() {
    this.auth.signOut();
  }
}
