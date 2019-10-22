import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Walker } from '../models/walker';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = environment.BASE_URL + '/oauth/token';
 
  constructor(private http: HttpClient) { }

  login(usuario: Walker): Observable<any>{
    const credentiales = btoa('tech-pro-app' + ':' + 't3chPr02019');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+ credentiales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.usuario);
    params.set('password', usuario.pwd);

    return this.http.post<any>(this.URL,params.toString(),{ headers: httpHeaders});
  }
  
}
