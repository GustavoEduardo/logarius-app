import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  http: HttpClient = inject(HttpClient);

  get(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/produto`);
  }
}
