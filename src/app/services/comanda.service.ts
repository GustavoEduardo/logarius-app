import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IComanda } from '../types/IComanda';
import { Helpers } from '../shared/helpers';


@Injectable({
  providedIn: 'root'
})

export class ComandaService {

  http: HttpClient = inject(HttpClient);

  create(data: Partial<IComanda> | any): Observable<any> {

    data = Helpers.deleteNull(data);

    return this.http.post(`${environment.apiUrl}/comanda`, data);
  }

  update(data: Partial<IComanda> | any, apenasComanda = false): Observable<any> {

    data = Helpers.deleteNull(data);
    const id =  data.comanda_id;
    delete data.comanda_id;

    if (apenasComanda) {
      data.apenasComanda = true;
    }

    return this.http.put(`${environment.apiUrl}/comanda/${id}`, data);
  }

  get(queryStr?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comanda${queryStr || ''}`);
  }
}
