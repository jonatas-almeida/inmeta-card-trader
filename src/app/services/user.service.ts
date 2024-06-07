import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../interfaces/User';
import UserCards from '../interfaces/UserCards';
import Cards from '../interfaces/Cards';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl: string = "https://cards-marketplace-api.onrender.com";

  constructor(
    private http: HttpClient
  ) { }

  public getAllCards(registersPerPage: number, page: number): Observable<Cards> {
    return this.http.get<Cards>(`${this._baseUrl}/cards?rpp=${registersPerPage}&page=${page}`);
  }

  public getUserInformation(): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/me`);
  }

  public getUserCards(): Observable<[UserCards]> {
    return this.http.get<[UserCards]>(`${this._baseUrl}/me/cards`);
  }

  public addUserCard(cards: { cardsIds: [] }): Observable<any> {
    return this.http.post(`${this._baseUrl}/me/cards`, cards);
  }
}
