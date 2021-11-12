import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBase = 'https://emprende.asistenciataller.cl/API/v2/';

  constructor(private http: HttpClient) { }

getUsuarios(): Observable<any> {

  return this.http.get(this.apiBase +'usuarios/1000300130').pipe();
}

postCrearUsuario(registro) {
  return this.http.post(this.apiBase+'crearUsuario',{registro}).pipe();
}
}
