import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/_interfaceAccount/owner.account';

@Component({
  selector: 'app-owner-account',
  templateUrl: './owner-account.component.html',
  styleUrls: ['./owner-account.component.css'],
})
export class OwnerAccountComponent implements OnInit {
  @Input()
  accounts: Account[] | undefined;

  @Output()
  onAccountClick: EventEmitter<Account> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onAccountClicked = (account: Account) => {
    this.onAccountClick.emit(account);
  };
}
