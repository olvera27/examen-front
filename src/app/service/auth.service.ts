import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:9090/auth/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8;',
    'Accept': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    'Pragma': 'no-cache',
    'Expires' : 'o'
  });

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario, {headers:this.headers});
  }

  public registro(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'registro', nuevoUsuario, {headers:this.headers});
  }

  public actualiza(actualizaUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<any>(this.authURL + 'actualizaPassword', actualizaUsuario);
  }
  
}
