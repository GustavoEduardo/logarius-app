import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../types/IUser';

const KEY = 'token-l';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  public userSubject = new BehaviorSubject<Partial<IUser> | null>(null);

  login(data: { login: string; senha: string }): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${environment.apiUrl}/login`, data, {
      observe: 'response',
    }).pipe(
      tap((response) => {
        const authToken = response.body?.result || '';
        this.salvarToken(authToken);
      })
    );
  }

  decodeJwt() {
    const token = this.getTokenLS();
    const user = jwtDecode(token) as Partial<IUser>;
    this.userSubject.next(user);
  }

  logout() {
    this.removerTokenLS();
    this.userSubject.next(null);
  }

  salvarToken(token: string) {
    this.salvarTokenLS(token);
    this.decodeJwt();
  }

  salvarTokenLS(token: string) {
    return localStorage.setItem(KEY, token);
  }

  getTokenLS() {
    //Armazenar tokens de autenticação com segurança, preferencialmente em cookies HTTP-only!
    return localStorage.getItem(KEY) || '';
  }

  removerTokenLS() {
    localStorage.removeItem(KEY);
  }

  estaLogado() {
    return !!this.getTokenLS();
  }

  getCurrentUser(){
    return this.userSubject.asObservable();
  }

  testeAuth(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${environment.apiUrl}/teste-auth`)
  }

}
