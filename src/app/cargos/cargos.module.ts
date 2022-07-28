import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModuleModule } from '../components/shared-module.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CargosRoutingModule } from './cargos-routing.module';
import { CargoComponent } from './pages/cargo/cargo.component';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { FormCargoComponent } from './components/form-cargo/form-cargo.component';


@NgModule({
  declarations: [
    ListarCargosComponent,
    CargoComponent,
    ConfirmarDelecaoComponent,
    FormCargoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModuleModule,
    MaterialModule,
    ReactiveFormsModule,
    CargosRoutingModule
  ]
})
export class CargosModule { }
