import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Pagamentos } from '../../models/pagamentos';
import { PagamentosService } from '../../service/pagamentos.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent implements OnInit {

  pagamento!: Pagamentos

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private title: Title, private pagamentoService: PagamentosService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idPagamento = parseInt(params.get('idPagamento') ?? '0')
        this.title.setTitle('Pagamento ' + idPagamento)
        this.recuperarPagamento(idPagamento)
      }
    )
  }

  formPagamento: FormGroup = this.fb.group({
    valor: ['', [Validators.required]],
    formPagamento: ['', [Validators.required]],
    statusPagamento: ['', [Validators.required]],
  })

  desabilitar: boolean = true
  naoEncontrado: boolean = false

  recuperarPagamento(id: number): void {
    this.pagamentoService.getPagamentoID(id)
      .subscribe(
        pagamento => {
          this.pagamento = pagamento

          this.formPagamento.setValue({
            valor: this.pagamento.valor,
            formPagamento: this.pagamento.formPagamento,
            statusPagamento: this.pagamento.statusPagamento,
          })
          this.valorMudou()

        })

  }

  salvarAtualizacoes() {
    const pagamento: Pagamentos = { ...this.formPagamento.value }
    pagamento.idPagamento = this.pagamento.idPagamento


    this.pagamentoService.putPagamento(pagamento).subscribe(
      (resultado) => {
        this.snack.open('Pagamento alterado com sucesso', 'Ok', { duration: 3000 });
        this.recuperarPagamento(pagamento.idPagamento)
      }

    )

  }


  valorMudou() {
    this.desabilitar = true;
    this.formPagamento.valueChanges
      .subscribe(
        (valores) => {
          console.log(valores)
          this.desabilitar = this.formPagamento.invalid || !(valores.valor != this.pagamento.valor || valores.formPagamento != this.pagamento.formPagamento || valores.statusPagamento != this.pagamento.statusPagamento)
        }
      )
  }


}
