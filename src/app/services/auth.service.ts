import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTEwMDY5NjEsImV4cCI6MTcxMTAzNDk2MX0.v4PPo3K8Mz1tvPlhV8BmDoJimaUEU7GpJGLCmLpNQ9c';
  http: HttpClient = inject(HttpClient);

  login(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/login`);
  }

  getAuthToken() {
    //Armazenar tokens de autenticação com segurança, preferencialmente em cookies HTTP-only!
    return this.token;
  }
}
