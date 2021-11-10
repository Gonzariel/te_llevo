import { Component, OnInit } from '@angular/core';
import {Storage} from '@capacitor/storage';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: any={
    nombre: "",
    apellido: "",
    email: "",
    pass: ""
  }
  constructor() { }

  ingresar(){
    var infoJson =JSON.stringify(this.registro);
    Storage.set({key: 'registro',value: infoJson});
  }

  ngOnInit() {
  }

}
