import { Component, OnInit } from '@angular/core';
import {Storage} from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController} from '@ionic/angular';


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
  campoError: string="";
  constructor(public alertCtrl: AlertController,private router: Router,public toastController: ToastController) { }

  ngOnInit() {
  }

  ingreso()
  {
    if(this.validarModelo(this.registro))
    {
  //    if(this.registro.nombre =="" && this.registro.apellido ==""&& this.registro.email =="" && this.registro.pass=="" )
        var infoJson =JSON.stringify(this.registro);
        Storage.set({key: 'registro',value: infoJson});
        this.router.navigate(['/home']);
    }
    else{
      this.mensajeToast("Porfavor llenar todos los campos");
    }  
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
