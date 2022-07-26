import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';
import { ChamadosComponent } from './pages/chamados/chamados.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModuleModule } from '../components/shared-module.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChamadosRoutingModule } from './chamados-routing.module';




@NgModule({
  declarations: [
    ListarChamadosComponent,
    ChamadosComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModuleModule,
    MaterialModule,
    ReactiveFormsModule,
    ChamadosRoutingModule

  ]
})
export class ChamadosModule { }
