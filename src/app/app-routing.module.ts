import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// localhost:4200 -> localhost:4200/funcionarios

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'funcionarios'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'funcionarios',
    loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionariosModule)
  },
  {
    path: 'pagamentos',
    loadChildren: () => import('./pagamentos/pagamentos.module').then(m => m.PagamentosModule)
  },
  {
    path: 'chamados',
    loadChildren: () => import('./chamados/chamados.module').then(m => m.ChamadosModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
  },
    {
    path: 'cargos',
    loadChildren: () => import('./cargos/cargos.module').then(m => m.CargosModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
