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
  return this.http.post(this.apiBase + 'crearUsuario', registro).pipe();
}

postLogin(login){
  return this.http.post(this.apiBase + 'loginUsuario', login).pipe();
}

postRecuperar(contrasena) {
  return this.http.post(this.apiBase + 'modificarPassword', contrasena).pipe();
}
  
postCrearviaje(crearviaje) {
  return this.http.post(this.apiBase + 'crearViaje', crearviaje).pipe();
}

getObtenerViajes(): Observable<any> {
  return this.http.get(this.apiBase + 'obtenerViajes/1000300130').pipe();
}
  
postConfirmarReserva(reserva) {
  return this.http.post(this.apiBase + 'enviarCorreoReserva', reserva).pipe();
}  
}

