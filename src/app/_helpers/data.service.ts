import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let users: User[] = [
      { id: 1, title: 'Mr', firstName: 'Asif', lastName: 'Ahmed', email: 'asif@gmail', dob: '1997-02-24', password: 'asif@123', acceptTerms: true },
      { id: 2, title: 'Mr', firstName: 'Vicky', lastName: 'Kumar', email: 'vicky@gmail', dob: '1997-10-10', password: 'vicky@123', acceptTerms: true }
    ];
    return { users };
  }
}
