import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';

const routes: Routes = [
  {
    path: '',
    component: ListarCargosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }
