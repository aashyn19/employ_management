import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_Base_PATH: string = "http://localhost:4200/api/";

  constructor(private _httpService: HttpClient) { }

  getUsers() {
    return this._httpService.get(this.API_Base_PATH + "users");
  }

  getUser(userid: number) {
    return this._httpService.get(`${this.API_Base_PATH}users/${userid}`);
  }

  addUser(user: User) {
    return this._httpService.post(`${this.API_Base_PATH}users`, user);
  }

  updateUser(user: User) {
    return this._httpService.put(`${this.API_Base_PATH}users/${user.id}`, user);
  }

  deleteUser(userid: number) {
    return this._httpService.delete(`${this.API_Base_PATH}users/${userid}`);
  }
}
