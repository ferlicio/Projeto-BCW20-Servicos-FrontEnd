import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ListarClientesComponent,
    children: [
      {
        path: ':idCliente',
        component: ClientesComponent,
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [
    RouterModule],
})
export class ClientesRoutingModule {}
