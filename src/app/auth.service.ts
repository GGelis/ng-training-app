import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string = '';

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name === 'admin' && password === 'admin');
    return of(isLoggedIn).pipe(
      delay(1000),
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }
  
  logout(): void {
    this.isLoggedIn = false;
  }
}
