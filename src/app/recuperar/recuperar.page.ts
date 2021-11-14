import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {ApiService} from '../servicios/api.service';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recuperar: any = {
    email: '',
    pass: '',
    token:'1000300130'
  };

  campoError: string = '';

  constructor(
    public toastController: ToastController,
    private router: Router,
    public alertCtrl: AlertController,private api: ApiService
  ) { }

  cambiarContrasena() {
    if (this.validarModelo(this.recuperar)) {
      var contrasena = { correo: this.recuperar.email, nueva_password: this.recuperar.pass, token_equipo:this.recuperar.token };
      this.api.postRecuperar(contrasena).subscribe((res) => {
        console.log(res);
        this.mensajeToast('Contraseña Modificada');
        return this.router.navigate(['home']);
      });
    } else {
      this.mensajeToast("Debe ingresar todos los campos");
    }
  }

  ngOnInit() { }

  //recuperarpass() {
  //  if (this.validarModelo(this.recuperar)) {
  //    this.mensajeToast('Enviado Correctamente');
  //    this.router.navigate(['/home']);
  //  } else {
  //    this.mensajeToast('Falta:' + this.campoError);
  //  }
  //}

  validarModelo(model: any) {
    for (var [key, value] of Object.entries(model)) {
      if (value == '') {
        this.campoError = key;
        return false;
      }
    }
    return true;
  }

  //async mensajeToast(message: string, duration?: number) {
  //  const toast = await this.toastController.create({
  //    message: message,
  //    duration: duration ? duration : 2000,
  //  });

  //  toast.present();
  //}

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
};
