import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/service/owner-repository.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css'],
})
export class OwnerListComponent implements OnInit {
  owners: Owner[] = [];
  errorMessage: string = '';
  constructor(
    private repository: OwnerRepositoryService, //service one to call the interfaces for CRUD operation
    private errorHandler: ErrorHandlerService, //Service two for calling erroe handle component
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOwners();
  }

  public getOwnerDetails = (id: string) => {
    const detailsUrl: string = `/owner/details/${id}`;
    this.router.navigate([detailsUrl]);
  };

  private getAllOwners = () => {
    const apiAddress: string = 'api/owner';
    this.repository.getOwners(apiAddress).subscribe({
      next: (own: Owner[]) => (this.owners = own), // next property will trigger if the response is successfull
      error: (err: HttpErrorResponse) => {
        // error property will handle the error response
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      },
    });
  };
}
