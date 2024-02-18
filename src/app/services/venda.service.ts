import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VendaService {

  http: HttpClient = inject(HttpClient);

  // Add tipagem
  // Add enviroment

  create(data: any): Observable<any> {
    return this.http.post(`${'enviroment'}`, data);
  }
}
