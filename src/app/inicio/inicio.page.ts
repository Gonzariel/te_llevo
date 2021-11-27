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
  public info: any;
  public nuevo: any;

  constructor(private api: ApiService,public alertCtrl: AlertController, private router: Router, private activateRoute: ActivatedRoute,
    public toastController: ToastController,private http: HttpClient) {

  }


  ngOnInit() {
    Storage.get({ key: "usuario" }).then((val) => {
      var objeto = JSON.parse(val.value)
      this.usuario = objeto.usser;
    });

    this.api.getObtenerViajes().subscribe((result) => {
      console.log("result",result);
      return this.viajes = result;
    });
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
            Storage.remove({key:'logeado'});
            this.router.navigate(['home']);
            //console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


}
