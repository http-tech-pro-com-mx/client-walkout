import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private URL = environment.BASE_URL + '/api/walkout/forgot-password-user';


  constructor(private http: HttpClient) { }

  recoveryPwd(correo_electronico: string): Observable<any>{
    const credentiales = btoa('tech-pro-app' + ':' + 't3chPr02019');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Basic '+ credentiales
    });

    return this.http.post<any>(this.URL,correo_electronico,{ headers: httpHeaders});
  }

}
