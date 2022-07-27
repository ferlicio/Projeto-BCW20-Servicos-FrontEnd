import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { PagamentosComponent } from '../pagamentos/pages/pagamentos/pagamentos.component';
import { FormClientesComponent } from './componentes/form-clientes/form-clientes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../components/shared-module.module';


@NgModule({
  declarations: [
    ListarClientesComponent,
    ClientesComponent,
    FormClientesComponent
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
