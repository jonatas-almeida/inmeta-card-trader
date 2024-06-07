import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Interfaces
import Register from '../interfaces/Register';
import Login from '../interfaces/Login';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = "https://cards-marketplace-api.onrender.com";

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  // Login do usuário
  public loginUser(payload: Login): Observable<Login> {
    return this.http.post<Login>(`${this._baseUrl}/login`, payload);
  }

  // Cria um usuário
  public createUser(payload: Register): Observable<Register> {
    return this.http.post<Register>(`${this._baseUrl}/register`, payload);
  }

  public logoutUser(): void {
    this.cookieService.delete('token');
  }
}