import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaProtegidaGuard } from '../ruta-protegida.guard';


import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    canActivate: [RutaProtegidaGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
