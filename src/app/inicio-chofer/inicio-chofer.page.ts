import { Component, OnInit } from '@angular/core';
import {Storage} from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController} from '@ionic/angular';
import {ApiService} from '../servicios/api.service';

@Component({
  selector: 'app-inicio-chofer',
  templateUrl: './inicio-chofer.page.html',
  styleUrls: ['./inicio-chofer.page.scss'],
})
export class InicioChoferPage implements OnInit {
  usuario = '';
  apellido = '';
  viaje: any = {
    horario: '',
    costo: '',
    destino: '',
    token: '1000300130'

  };
  campoError: string;

  constructor(private api: ApiService,public alertCtrl: AlertController, private router: Router, private activateRoute: ActivatedRoute,
    public toastController: ToastController) {

  }


  ngOnInit() {
    Storage.get({ key: "datos" }).then((val) => {
      var objeto = JSON.parse(val.value)
      this.usuario = objeto.nombre;
      this.apellido=objeto.apellidos;
      this.mensajeToast('Bienvenido ' + objeto.nombre+' '+objeto.apellidos);
    });
  }

  crearViaje() {
    if (this.validarModelo(this.viaje)) {
      var viaje = {
        horario_salida: this.viaje.horario, costo_por_persona: this.viaje.costo,
        lugar_destino: this.viaje.destino, token_equipo: this.viaje.token
      };
      this.api.postCrearviaje(viaje).subscribe((res) => {
        console.log(res);
        var result = JSON.stringify(res);
        var respuesta = JSON.parse(result);
        console.log(result);
        console.log(respuesta);
        this.mensajeToast("El viaje se ha registrado");
      });
    } else {
      this.mensajeToast("Porfavor llenar todos los campos");
    }
  }
  //Inicio()
  //{
     //console.log('prueba')
  //  this.router.navigate(['login'])
  //}

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Estas Seguro?!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            Storage.remove({key:'usuario'});
            Storage.remove({ key: 'logeado' });
            Storage.remove({key: 'datos'})
            this.router.navigate(['home']);
            //console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
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
