import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clientes } from 'src/app/clientes/models/clientes';
import { ClientesService } from 'src/app/clientes/service/clientes.service';
import { ConfirmarSaidaComponent } from 'src/app/components/confirmar-saida/confirmar-saida.component';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { Chamado } from '../../model/chamado';
import { ChamadosService } from '../../service/chamados.service';


@Component({
  selector: 'app-form-chamados',
  templateUrl: './form-chamados.component.html',
  styleUrls: ['./form-chamados.component.css']
})
export class FormChamadosComponent implements OnInit {

  salvandoChamado: boolean = false
  clientes: Clientes[] = []
  status: string[] = ['RECEBIDO', 'ATRIBUIDO', 'CONCLUIDO', 'ARQUIVADO']
  funcionarios: Funcionario[] = []

  formChamado: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descricao: [''],
    dataEntrada: ['', [Validators.required]],
    status: [''],
    funcionario: [''],
    idCliente: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private chamadosService: ChamadosService,
    private dialogRef: MatDialogRef<FormChamadosComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private clienteService: ClientesService,
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes
      }
    )
    this.funcionarioService.getFuncionarios().subscribe(
      (funcionarios) => {
        this.funcionarios = funcionarios
      }
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

  salvar(): void {
    this.salvandoChamado = true
    const f: Chamado = this.formChamado.value

    f.funcionario = this.formChamado.value.funcionario

    console.log(f)
    this.chamadosService.postChamado(f, this.formChamado.value.idCliente).subscribe(
      success => {
        this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }
}




