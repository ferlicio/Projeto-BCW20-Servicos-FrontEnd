import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Chamado } from 'src/app/chamados/model/chamado';
import { ChamadosService } from 'src/app/chamados/service/chamados.service';
import { PagamentosService } from '../../service/pagamentos.service';
import { ConfirmarSaidaComponent } from '../../../funcionarios/components/confirmar-saida/confirmar-saida.component';
import { Pagamentos } from '../../models/pagamentos';

@Component({
  selector: 'app-form-pagamento',
  templateUrl: './form-pagamento.component.html',
  styleUrls: ['./form-pagamento.component.css']
})
export class FormPagamentoComponent implements OnInit {

  chamados!: Chamado[]
  formas: string[] = ["A VISTA", "A PRAZO", "PARCELADO", "BOLETO", "CARTAO DE CREDITO"]
  status: string[] = ["QUITADO", "LANCADO"]
  chamadoSelect!: Chamado

  salvandoPagamento: boolean = false


  constructor(private fb: FormBuilder,
    private chamadoService: ChamadosService,
    private pagamentoService: PagamentosService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<FormPagamentoComponent>) { }

  ngOnInit(): void {
    this.chamadoService.getChamados().subscribe(
      (chamados) => {
        this.chamados = chamados
      }
    )

  }

  formularioPagamento: FormGroup = this.fb.group({
    valor: ['', [Validators.required]],
    formPagamento: ['', [Validators.required]],
    statusPagamento: ['', [Validators.required]],
    chamado: ['', [Validators.required]]
  })


  salvar(): void {
    this.salvandoPagamento = true
    const pagamento: Pagamentos = this.formularioPagamento.value
    const chamado: Chamado = this.formularioPagamento.value.chamado
    /*     console.log(pagamento)
        console.log('ESPAÇO');
        console.log(chamado); */
    this.pagamentoService.postPagamento(pagamento, chamado.idChamado).subscribe(
      (t) => this.dialogRef.close()
    )
  }


  confirmarSaida() {
    this.dialog.open(ConfirmarSaidaComponent).afterClosed().subscribe(
      (res) => {
        if (res == true) {
          this.dialogRef.close()
        }
      }
    )
  }


}
