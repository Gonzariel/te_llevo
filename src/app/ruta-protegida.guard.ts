import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage' ;

@Injectable({
  providedIn: 'root'
})
export class RutaProtegidaGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.verLogeado();
  }
  async verLogeado(){
    var retorno:boolean = false;

    var dato = await Storage.get({key : 'logeado'});

    if(dato.value == "ok")
    {
      retorno = true;
    }


    return retorno;
  }  



}
