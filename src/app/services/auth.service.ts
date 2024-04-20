import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE0NTQ3MjMsImV4cCI6MTcxMTQ4MjcyM30._-2Zjg7JHxuOwmALxhN3JI63cJCfKoWLguJGx6tcWH8';
  http: HttpClient = inject(HttpClient);

  login(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/login`);
  }

  getAuthToken() {
    //Armazenar tokens de autenticação com segurança, preferencialmente em cookies HTTP-only!
    return this.token;
  }
}
