import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Ip } from '../models/ip';
import { Grid } from '../models/grid';

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
    return this.http.get<any>(this.URL + '/get-Grids/'+id_ip+'/All-walkers');
  }

  getInfoByIp(id_ip): Observable<any>{
    return this.http.get<any>(this.URL + '/get-IP/'+id_ip);
  }


  getDetalleByGrid(id_grid): Observable<any>{
    return this.http.get<any>(this.URL + '/get-Grid/'+id_grid);
  }

  createIp(ip: Ip):Observable<any>{
    let params = JSON.stringify(ip);
    return this.http.post<any>(this.URL + '/crear-IP', params);
  }

  updateIP(ip: Ip):Observable<any>{
    let params = JSON.stringify(ip);
    return this.http.post<any>(this.URL + '/update-IP', params);
  }

  createGrid(grid: Grid): Observable<any>{
    let params = JSON.stringify(grid);
    return this.http.post<any>(this.URL + '/crear-Grid', params);
  }

  updateGrid(grid: Grid):Observable<any>{
    let params = JSON.stringify(grid);
    return this.http.post<any>(this.URL + '/update-Grid', params);
  }

  deleteGrid(id_grid: number):Observable<any>{
    return this.http.delete<any>(this.URL+'/delete-Grid/' + id_grid );
  }


}
