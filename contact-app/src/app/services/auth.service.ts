import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private tokenKey = 'authToken';

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

    login(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, user);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    isLoggedIn(): boolean | string | null {
        const token = localStorage.getItem(this.tokenKey);
        return token && !this.jwtHelper.isTokenExpired(token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }
}
