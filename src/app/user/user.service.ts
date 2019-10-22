import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.BASE_URL + '/api/walkout';

  constructor( private http: HttpClient) { }

  getInfoPerfil(id_walker: number): Observable<any>{
    return this.http.get<any>(this.URL + '/get-walker/' + id_walker);
  }

  
}
