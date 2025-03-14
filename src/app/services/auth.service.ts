import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user)
      .pipe(
        catchError(error => {
          if (error.status === 409) {
            console.error('El email ya está registrado');
          } else {
            console.error('Error en el registro:', error);
          }
          return throwError(() => error);
        })
      );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/authenticate`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getProtectedData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/demo-controller`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  handleLoginSuccess(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/home']);
  }
}
