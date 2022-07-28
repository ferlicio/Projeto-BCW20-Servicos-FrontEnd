import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../components/shared-module.module';
import { DelecaoClienteComponent } from './components/delecao-cliente/delecao-cliente.component';


@NgModule({
  declarations: [
    ListarClientesComponent,
    ClientesComponent,
    FormClientesComponent,
    DelecaoClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModuleModule

  ]
})
export class ClientesModule { }
