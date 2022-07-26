import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';

const routes: Routes = [
  {
    path: '',
    component: ListarChamadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
