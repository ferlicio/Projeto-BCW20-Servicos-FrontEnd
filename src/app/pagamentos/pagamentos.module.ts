import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PagamentoRoutingModule } from './pagamentos-routing.module';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { HttpClientModule } from '@angular/common/http';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';
import { FormPagamentoComponent } from './componentes/form-pagamento/form-pagamento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../components/shared-module.module';



@NgModule({
  declarations: [
    ListarPagamentosComponent,
    PagamentosComponent,
    FormPagamentoComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagamentoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModuleModule


  ]
})
export class PagamentosModule { }
