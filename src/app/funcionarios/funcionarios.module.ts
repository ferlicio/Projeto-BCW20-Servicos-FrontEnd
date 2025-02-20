import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { MaterialModule } from '../material/material.module';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { FormFuncionarioComponent } from './components/form-funcionario/form-funcionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { ConfirmarLogoutComponent } from './components/confirmar-logout/confirmar-logout.component';
import { SharedModuleModule } from '../components/shared-module.module';


@NgModule({
  declarations: [
    ListarFuncionariosComponent,
    FuncionarioComponent,
    FormFuncionarioComponent,
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent,
    ConfirmarLogoutComponent,
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class FuncionariosModule { }
