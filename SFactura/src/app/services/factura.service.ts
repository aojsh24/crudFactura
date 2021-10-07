import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  apiFactura = GLOBAL.url
  objDetalles: any[] = [];

  constructor(private http: HttpClient) { }
  setFactura(data:{}){
      return this.http.post(this.apiFactura+'Facturas', data);
  }
  getFacturas(): Observable<any>{
    return this.http.get(this.apiFactura + 'Facturas');
  }
  
  getFactura(id:number): Observable<any>{
    return this.http.get(this.apiFactura + 'Facturas/'+id);
  }
  update(id:number,data:{}){
    return this.http.put(this.apiFactura+'Facturas/'+id,data);
  }
  deleteFactura(id: number):Observable<any>{
      return this.http.delete(this.apiFactura + 'Facturas/'+id);
  }

  setDetalle(data:{}){
    return this.http.post(this.apiFactura+'Detalles', data);
  }

  deleteDetalle(id: number):Observable<any>{
    return this.http.delete(this.apiFactura + 'Detalles/'+id);
  }

  
}
