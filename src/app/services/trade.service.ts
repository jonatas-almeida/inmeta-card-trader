import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Trade from '../interfaces/Trade';
import TradeCards from '../interfaces/TradeCards';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private _baseUrl: string = "https://cards-marketplace-api.onrender.com";

  constructor(
    private http: HttpClient
  ) { }

  // Retorna todas as Trades abertas
  public getAllTrades(registersPerPage: number, page: number): Observable<Trade> {
    return this.http.get<Trade>(`${this._baseUrl}/trades?rpp=${registersPerPage}&page=${page}`);
  }

  // Cria as Trades
  public createTrades(payload: TradeCards): Observable<TradeCards> {
    return this.http.post<TradeCards>(`${this._baseUrl}/trades`, payload);
  }

  // Remove uma Trade
  public removeTrade(id: string): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/trades/${id}`);
  }
}