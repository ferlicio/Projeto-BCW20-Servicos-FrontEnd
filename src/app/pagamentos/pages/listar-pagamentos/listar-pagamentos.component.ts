import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormPagamentoComponent } from '../../componentes/form-pagamento/form-pagamento.component';
import { Pagamentos } from '../../models/pagamentos';
import { PagamentosService } from '../../service/pagamentos.service';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.css']
})
export class ListarPagamentosComponent implements OnInit {

  colunas: Array<string> = ['id', 'valor', 'forma_pagamento', 'status', 'actions']
  pagamentos: Pagamentos[] = []


  constructor(private pagamentoService: PagamentosService, private router: Router, private title: Title, private snack: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.title.setTitle('Pagamentos');
    this.pagamentoService.atualizarPagamentosSub$.subscribe((precisaAtualizar) => {
      if (precisaAtualizar) {
        this.recuperarPagamentos();
      }
    })


  }

  recuperarPagamentos(): void {
    this.pagamentoService.getPagamentos().subscribe(
      (pagamentos) => {
        this.pagamentos = pagamentos
      },
      (erro) => {
        console.log(erro)
      }
    )
  }

  abrirFormulario(): void {
    const dialog = this.dialog.open(FormPagamentoComponent)
    dialog.afterClosed().subscribe(
      () => this.recuperarPagamentos()
    )
  }


}
