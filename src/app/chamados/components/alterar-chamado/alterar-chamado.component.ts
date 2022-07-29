import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clientes } from 'src/app/clientes/models/clientes';
import { ConfirmarSaidaComponent } from 'src/app/components/confirmar-saida/confirmar-saida.component';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { Chamado } from '../../model/chamado';
import { ChamadosService } from '../../service/chamados.service';
import { Pagamentos } from '../../../pagamentos/models/pagamentos';


@Component({
  selector: 'app-alterar-chamado',
  templateUrl: './alterar-chamado.component.html',
  styleUrls: ['./alterar-chamado.component.css']
})
export class AlterarChamadoComponent implements OnInit {

  salvandoChamado: boolean = false
  status: string[] = ['RECEBIDO', 'ATRIBUIDO', 'CONCLUIDO', 'ARQUIVADO']
  funcionarios: Funcionario[] = []
  pagamentos: Pagamentos[] = []

  chamado!: Chamado
  desabilitar: boolean = true


  formChamado: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descricao: [''],
    status: [''],
    funcionario: [``],
  })

  constructor(
    private fb: FormBuilder,
    private chamadosService: ChamadosService,
    private dialogRef: MatDialogRef<AlterarChamadoComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private funcionarioService: FuncionarioService,
    @Inject(MAT_DIALOG_DATA) data: Chamado) {
    this.chamado = data
  }

  ngOnInit(): void {


    this.funcionarioService.getFuncionarios().subscribe(
      (funcionarios) => {
        this.funcionarios = funcionarios
      }
    )

    this.formChamado.setValue(
      {
        titulo: this.chamado.titulo,
        descricao: this.chamado.descricao,
        status: this.chamado.status,
        funcionario: this.chamado.funcionario.idFuncionario,
      }
    )


    this.valorMudou()

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

  salvar(): void {
    const f: Chamado = this.formChamado.value
    const idFunc = this.formChamado.value.funcionario

    f.idChamado = this.chamado.idChamado
    f.dataEntrada = this.chamado.dataEntrada
    if (this.chamado.pagamento.idPagamento != 999999) {
      f.pagamento = this.chamado.pagamento
    }

    this.chamadosService.putChamado(f, f.idChamado, idFunc).subscribe(
      success => {
        this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
          duration: 3000
        }
        )
        this.dialogRef.close()
      }
      , (err) => {
        console.log(err); this.snackbar.open('Erro ao alterar chamado', 'Ok', {
          duration: 3000
        })
      })

  }

  valorMudou() {
    this.desabilitar = true;
    this.formChamado.valueChanges

      .subscribe(
        (valores) => {

          this.desabilitar = this.formChamado.invalid || !(valores.titulo != this.chamado.titulo || valores.descricao != this.chamado.descricao || valores.status !=
            this.chamado.status || valores.funcionario != this.chamado.funcionario.idFuncionario)
        })

  }
}

