import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {Storage} from '@capacitor/storage';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})


export class InicioPage implements OnInit {
 usuario='';

  constructor(public alertCtrl: AlertController, private router: Router, private activateRoute: ActivatedRoute,
    public toastController: ToastController) {

  }


  ngOnInit() {
    Storage.get({key:"usuario"}).then((val)=>{
      var objeto =JSON.parse(val.value)
      this.usuario=objeto.usser
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
            this.router.navigate(['home']);
            //console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


}
