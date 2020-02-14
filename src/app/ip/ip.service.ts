import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Ip } from '../models/ip';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  private URL = environment.BASE_URL + '/api/walkout';

  constructor( private http: HttpClient) { }

  getInfoProyectos(): Observable<any>{
    return this.http.get<any>(this.URL + '/get-proyectos');
  }

  getInfoIPSForProject(id_proyecto: number): Observable<any>{
    return this.http.get<any>(this.URL + '/get-IPS/proyecto/'+id_proyecto);
  }

  changeStatus(ip: Ip): Observable<any>{
    let params = JSON.stringify( ip );
    return this.http.post<any>(this.URL + '/changeStatusIP', params );
  }

  deleteIP(ip: Ip): Observable<any>{
    return this.http.delete<any>(this.URL + '/delete-IP/'+ip.id_ip)
  }

}
