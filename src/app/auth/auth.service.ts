import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient)
  router = inject(Router)
  cookieService = inject(CookieService)
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/'

  token: string | null = null
  refreshToken: string | null = null

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }

  login(payload: {username: string, password: string}) {
    const fd = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)
    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, 
      fd,
    ).pipe( 
      tap( val => {
        this.token = val.access_token
        this.refreshToken = val.refresh_token

        this.cookieService.set('token', this.token)
        this.cookieService.set('refreshToken', this.refreshToken)
      })
    )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      {
        refresh_token: this.refreshToken,
      }
    ).pipe (
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

}
