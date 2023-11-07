import { Account } from '../_interfaceAccount/owner.account';

export interface Owner {
  id: string;
  name: string;
  dateOfBirth: Date;
  address: string;
  accounts?: Account[];
}
