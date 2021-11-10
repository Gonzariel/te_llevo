import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController} from '@ionic/angular';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  ingreso:FormGroup;
  registro: any = {
    nombre1: ''
   
  };
 
  constructor(private router: Router,public fb: FormBuilder,public alertController: AlertController) {

    this.ingreso = this.fb.group(
      {
        'nombre': new FormControl("", Validators.required),
        'apellido': new FormControl("", Validators.required),
        'email': new FormControl("", Validators.required),
        'pass': new FormControl("", Validators.required)
      });
   }

  ngOnInit() {
  }

  async presentAlert(){
    var reg = this.ingreso.value;
    if(this.ingreso.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    var usuario = {
      nombre: reg.nombre,
      password: reg.password,
      correo: reg.correo
    }
    localStorage.setItem(reg.nombre, JSON.stringify(usuario));
    let navigationExtras: NavigationExtras = {
      state: {
        registro: this.registro
      }
    };
    const alert = await this.alertController.create({
      header: 'Datos correctos',
      message: 'Bienvenido '+ usuario.nombre,
      buttons: ['Aceptar']
    })
    await alert.present();
    this.router.navigate(['/home'], navigationExtras);

  }
}
