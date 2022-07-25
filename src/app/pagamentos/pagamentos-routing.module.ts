import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';

const routes: Routes = [
  {
    path: '',
    component: ListarPagamentosComponent,
    children: [
      {
        path: ':idPagamento',
        component: PagamentosComponent,
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class PagamentoRoutingModule { }
