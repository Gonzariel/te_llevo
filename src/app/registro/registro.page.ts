import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: any = {
    nombre: '',
    apellido: '',
    email: '',
    pass: '',

  };

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) { }

  crearUsuario() {
    this.api.postCrearUsuario(this.registro).subscribe((res) => {
      console.log(res);

    });
    return this.router.navigate(['home']);
  }

  ingresar(){
    var infoJson =JSON.stringify(this.registro);
    Storage.set({key: 'registro',value: infoJson});
  }

  ngOnInit() {
  }

}
