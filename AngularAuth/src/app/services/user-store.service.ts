import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  //behaviour subject
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  constructor() {}

  //getter role when someone subscribe for the getter they will get the role
  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  //setter for role
  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable(); //observable is nothing but a stream of data
  }

  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }
}
