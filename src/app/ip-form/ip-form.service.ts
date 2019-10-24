import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Ip } from '../models/ip';

@Injectable({
  providedIn: 'root'
})
export class IpFormService {

  private URL = environment.BASE_URL + '/api/walkout';

  constructor( private http: HttpClient) { }

  getInfoProyectos(): Observable<any>{
    return this.http.get<any>(this.URL + '/get-proyectos');
  }

  getGridsByIp(id_ip: number): Observable<any>{
    return this.http.get<any>(this.URL + '/get-Grids/'+id_ip);
  }

  createIp(ip: Ip):Observable<any>{
    let params = JSON.stringify(ip);
    return this.http.post<any>(this.URL + 'crear-IP', params);
  }

}