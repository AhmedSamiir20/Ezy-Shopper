import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl='https://fakestoreapi.com/auth/login';
  constructor(private httpclient:HttpClient) { }

  login(login:User):Observable<any>{
    return this.httpclient.post<any>(this.loginUrl, login);
  }
}
