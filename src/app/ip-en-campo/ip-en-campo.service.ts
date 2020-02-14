import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Ip } from '../models/ip';

@Injectable({
  providedIn: 'root'
})
export class IpEnCampoService {

  private URL = environment.BASE_URL + '/api/walkout';

  constructor( private http: HttpClient) { }

  getInfoProyectos(): Observable<any>{
    return this.http.get<any>(this.URL + '/get-proyectos');
  }

  getIpsEnCampo(id_proyecto: number): Observable<any>{
    return this.http.get<any>(this.URL + '/get-ips-en-campo/proyecto/'+id_proyecto);
  }

  
  changeUpdate(ip: Ip): Observable<any>{
    let params = JSON.stringify( ip );
    return this.http.post<any>(this.URL + '/update-fecha-asigna-camina', params );
  }
  
}
