import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduto } from '../types/IProduto';
import { Helpers } from '../shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  http: HttpClient = inject(HttpClient);

  get(queryStr?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/produto${queryStr || ''}`);
  }

  create(data: Partial<IProduto> | any): Observable<any> {

    data = Helpers.deleteNull(data);

    return this.http.post(`${environment.apiUrl}/produto`, data);
  }
}
