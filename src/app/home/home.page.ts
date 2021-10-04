import { Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: any = {
    usser: '',
    pass:''
  };

  campoError:string ="";


  constructor(public alertCtrl: AlertController,private router: Router,public toastController: ToastController) {}

  ngOnInit(){

  }


  ingresar()
  {
    if(this.validarModelo(this.usuario))
    {
      
      
      if(this.usuario.usser == "Ariel" && this.usuario.pass =="1313"){
        let navigationExtras: NavigationExtras = {
          state: {
           usuario: this.usuario
          }};
        console.log('usuario ' + this.usuario.usser + ' ' + this.usuario.pass);
        this.router.navigate(['/inicio'],navigationExtras);
      }
      else{
        this.mensajeToast(" Usuario o Contraseña Incorrecto");
      }
              
    }

  }

  validarModelo(model:any)
  {
    for(var [key, value] of Object.entries(model))
    {
      console.log(key+" value: "+value);
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