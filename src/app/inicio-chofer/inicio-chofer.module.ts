import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioChoferPageRoutingModule } from './inicio-chofer-routing.module';

import { InicioChoferPage } from './inicio-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioChoferPageRoutingModule
  ],
  declarations: [InicioChoferPage]
})
export class InicioChoferPageModule {}
