import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/_interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/service/owner-repository.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css'],
})
export class OwnerDetailsComponent implements OnInit {
  owner!: Owner;
  errorMessage: string = '';
  constructor(
    private repository: OwnerRepositoryService, //service one to call the interfaces for CRUD operation
    private errorHandler: ErrorHandlerService, //Service two for calling erroe handle component
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  public getOwnerDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = `api/owner/$(id)/account`;

    this.repository.getOwner(apiUrl).subscribe({
      next: (own: Owner) => (this.owner = own),
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      },
    });
  };
}
