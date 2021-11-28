import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../servicios/api.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})


export class InicioPage implements OnInit {
  viajes: any = [];
  usuario: '';
  nombre: '';
  correo: '';
  apellido: '';

  token: any = {
    tok: '1000300130'
  };

  public info: any;
  public nuevo: any;

  constructor(private api: ApiService,public alertCtrl: AlertController, private router: Router, private activateRoute: ActivatedRoute,
    public toastController: ToastController,private http: HttpClient) {

  }


  ngOnInit() {
    Storage.get({ key: "datos" }).then((val) => {
      var objeto = JSON.parse(val.value)
      this.usuario = objeto.nombre;
      this.apellido=objeto.apellidos;
      this.mensajeToast('Bienvenido ' + objeto.nombre+' '+objeto.apellidos);
    });

  
    this.api.getObtenerViajes().subscribe((respuesta) => {
      console.log("result",respuesta.result);
      return this.viajes = respuesta.result;
    });

   
    
  }
  
  reservaViaje() {
    Storage.get({ key: "datos" }).then((val) => {
      var objeto = JSON.parse(val.value)
      this.usuario = objeto.nombre + objeto.apellidos;
      var reserva={nombre:objeto.nombre,correo:objeto.correo,token_equipo:this.token.tok}
      this.api.postConfirmarReserva(reserva).subscribe((res => {
        console.log(res);
        var result = JSON.stringify(res);
        var respuesta = JSON.parse(result);
        this.mensajeToast(respuesta.result);
      }))
    })

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
            Storage.remove({key: 'datos'});
            this.router.navigate(['home']);
            //console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
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
