import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModuleModule } from '../components/shared-module.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CargosRoutingModule } from './cargos-routing.module';


@NgModule({
  declarations: [
    ListarCargosComponent
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
