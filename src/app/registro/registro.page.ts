import { Component, OnInit } from '@angular/core';
import {Storage} from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController} from '@ionic/angular';
import {ApiService} from '../servicios/api.service';

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
    token: '1000300130'

  };

  constructor(private api: ApiService, private router: Router,
    private activateRoute: ActivatedRoute, public toastController: ToastController) { }

  crearUsuario() {
    if (this.validarModelo(this.registro)) {
      var registro = {
        nombre: this.registro.nombre, apellidos: this.registro.apellido,
        correo: this.registro.email, password: this.registro.pass, token_equipo: this.registro.token
      };
      this.api.postCrearUsuario(registro).subscribe((res) => {
        console.log(res);
        var result = JSON.stringify(res);
        var respuesta = JSON.parse(result);
        console.log(result);
        console.log();
        this.mensajeToast(respuesta.result);
        return this.router.navigate(['home']);
      });
    } else {
      this.mensajeToast("Porfavor llenar todos los campos");
    }
  }
  campoError: string="";

  ngOnInit() {
  }

  validarModelo(model: any)
  {
    for(var [key, value] of Object.entries(model))
    {

      console.log(key+" value:"+value);
      if(value=="")
      {
      this.campoError = key;
      return false;
      }
    }
    return true;
  }


  async mensajeToast(message:string, duration?:number)
  {
    const toast = await this.toastController.create(
      {
        message :message,
        duration: duration?duration:3000
       }
    );

    toast.present();
  }







}
