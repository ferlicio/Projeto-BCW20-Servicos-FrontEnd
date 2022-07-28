import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormCargoComponent } from '../../components/form-cargo/form-cargo.component';
import { Cargo } from '../../models/cargo';
import { CargosService } from '../../services/cargo.service';

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css']
})
export class ListarCargosComponent implements OnInit {

  cargos: Cargo[] = []
  colunas: Array<string> = ['id', 'nome', 'descricao', 'salario', 'actions']

  constructor(
    private cargoService: CargosService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private title: Title,
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cargos')
    this.cargoService.atualizarFuncionariosSub$
      .subscribe(
        (precisaAtualizar) => {
          if (precisaAtualizar) {
            this.recuperarCargos()
          }
        }
      ) 
  }

  deletarCargo(carg: Cargo): void {

    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
      .subscribe(
        (deletar) => {

          if (deletar == true) {
            this.cargoService.deleteCargo(carg)
              .subscribe(
                () => {
                  this.snackbar.open('Funcionário deletado', 'Ok', {
                    duration: 3000
                  })
                  this.recuperarCargos()
                },
                (error) => {
                  this.snackbar.open('Não foi possível deletar o funcionário', 'Ok', {
                    duration: 3000
                  })
                  console.log(error)
                }
              )
          }
        }
      )
  }

  recuperarCargos(): void {
    this.cargoService.getCargos().subscribe(
      (funcs) => { 
        this.cargos = funcs

      },
      (erro) => {
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormCargo(): void {

    const referenciaDialog = this.dialog.open(FormCargoComponent, { disableClose: true })

    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarCargos()
      }
    )
  }
}
