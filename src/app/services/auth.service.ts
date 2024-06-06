import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Interfaces
import Register from '../interfaces/Register';
import Login from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _baseUrl: string = "https://cards-marketplace-api.onrender.com";

  constructor(private http: HttpClient) { }

  // Login do usuário
  public loginUser(payload: Login): Observable<Login> {
    return this.http.post<Login>(`${this._baseUrl}/login`, payload);
  }

  // Cria um usuário
  public createUser(payload: Register): Observable<Register> {
    return this.http.post<Register>(`${this._baseUrl}/register`, payload);
  }
}