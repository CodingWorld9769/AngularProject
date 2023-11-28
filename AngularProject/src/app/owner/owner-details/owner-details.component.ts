import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/_interfaceAccount/owner.account';
import { Owner } from 'src/app/_interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { AppendDirective } from 'srcappshareddirectivesappend.directive.ts';
@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css'],
})
export class OwnerDetailsComponent implements OnInit {
  owner!: Owner | undefined;
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
    const apiUrl: string = `api/owner/${id}/account`;

    this.repository.getOwners(apiUrl).subscribe({
      next: (own: any) => {
        console.log('---------', own), (this.owner = own);
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      },
    });
  };

  printToConsole = (param: Account) => {
    console.log('Account parameter from the child component', param);
  };
}
