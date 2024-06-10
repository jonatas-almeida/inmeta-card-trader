import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(): boolean {
    const token = this.cookieService.get('token');

    if (token && this.isTokenValid(token)) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  // Valida o token
  private isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token, undefined);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }
}