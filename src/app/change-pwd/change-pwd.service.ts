import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePwdService {

  private URL = environment.BASE_URL + '/api/walkout';

  constructor(private http: HttpClient) { }

  changePassword(data: any): Observable<any> {
    let params = JSON.stringify(data);
    return this.http.post<any>(this.URL + '/changePassword', params);
  }

  
}
