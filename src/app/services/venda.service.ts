import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IVenda } from '../types/IVenda';


@Injectable({
  providedIn: 'root'
})

export class VendaService {

  http: HttpClient = inject(HttpClient);

  create(data: Partial<IVenda>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/venda`, data);
  }
}
