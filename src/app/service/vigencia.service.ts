import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class VigenciaService {

  vigenciaURL = 'http://localhost:9090/vigencia/';
  token:any;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8;',
    'Accept': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',    
    'Pragma': 'no-cache',
    'Expires' : 'o'
  });

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    this.token = JSON.stringify(this.tokenService.getToken()).replace(/['"]+/, '').replace(/['"]+/, '');
  }

  public consulta(usuario: String): Observable<Usuario> {    
    return this.httpClient.get<Usuario>(this.vigenciaURL + `consulta?nombre=${usuario}`, {headers: this.headers.append('Authorization',this.token)});
  }

  public updateVigencia(usuario: Usuario): Observable<any>  {
    return this.httpClient.post<any>(this.vigenciaURL + `actualizarVigencia`, usuario, {headers: this.headers.append('Authorization',this.token)});
  }
  
}
