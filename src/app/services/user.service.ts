import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl: string = "https://cards-marketplace-api.onrender.com";

  constructor(
    private http: HttpClient
  ) { }

  public getUserInformation(): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/me`);
  }
}
