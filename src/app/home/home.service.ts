import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private URL = environment.BASE_URL + '/api/walkout';

  constructor( private http: HttpClient) { }

  getInfoProyectos(): Observable<any>{
    return this.http.get<any>(this.URL + '/get-proyectos');
  }


  rptGlobalProyecto(id_proyecto: number): Observable<any>{
    return this.http.get<any>(this.URL + '/rpt-global/'+id_proyecto);
  }


  rptGlobalProyectoByDay(id_proyecto: number, date: Date): Observable<any>{
    return this.http.get<any>(this.URL + '/rpt-global/'+id_proyecto+'/'+date);
  }

  
}
