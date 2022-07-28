import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoComponent } from './pages/cargo/cargo.component';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';

const routes: Routes = [
  {
    path: '',
    component: ListarCargosComponent,
    children: [
      {
        path: ':idCargo',
        component: CargoComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }
