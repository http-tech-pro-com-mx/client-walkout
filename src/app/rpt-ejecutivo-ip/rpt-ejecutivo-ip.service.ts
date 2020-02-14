import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RptEjecutivoIpService {

  private URL = environment.BASE_URL + '/api/walkout';

  constructor( private http: HttpClient) { }

  getProyectos(): Observable<any>{
    return this.http.get<any>(this.URL + '/get-proyectos');
  }


  getReporteSemanaActual(id_proyecto: number): Observable<any>{
    return this.http.get<any>(this.URL + '/rpt-ip-semanal-actual/'+id_proyecto);
  }



}
