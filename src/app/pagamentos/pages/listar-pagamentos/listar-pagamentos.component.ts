import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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


  constructor(private pagamentoService: PagamentosService, private router: Router, private title: Title, private snack: MatSnackBar) { }

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


}
