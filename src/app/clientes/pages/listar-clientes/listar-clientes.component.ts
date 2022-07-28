import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { FormClientesComponent } from '../../components/form-clientes/form-clientes.component';
import { DelecaoClienteComponent } from '../../components/delecao-cliente/delecao-cliente.component';
import { Clientes } from '../../models/clientes';
import { ClientesService } from '../../service/clientes.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Clientes[] = []
  colunas: Array<string> = ['id', 'nome', 'e-mail', 'endereço', 'actions']

  constructor(
    private clienteService: ClientesService,
    private title: Title,
    private dialogCliente: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Clientes');
    this.clienteService.atualizarClientesSub$.subscribe((precisaAtualizar) => {
      if (precisaAtualizar) {
        this.recuperarCliente();
      }
    })


  }


  recuperarCliente(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes

      },
      (erro) => {
        console.log(erro)
      }
    )
  }


  abrirFormCliente() {
    const formDialog = this.dialogCliente.open(FormClientesComponent)
    formDialog.afterClosed().subscribe(
      () => {
        this.recuperarCliente()
      }
    )
  }


  deletarCliente(cliente: Clientes) {

    const dialogRef = this.dialogCliente.open(DelecaoClienteComponent)

    dialogRef.afterClosed()
      .subscribe(
        (deletar) => {

          if (deletar == true) {
            this.clienteService.deleteCliente(cliente.idCliente)
              .subscribe(
                () => {
                  this.snackbar.open('Cliente excluído com sucesso', 'Ok', {
                    duration: 3000
                  })
                  this.recuperarCliente()
                },
                (error) => {
                  this.snackbar.open('Não foi possível deletar o cliente', 'Ok', {
                    duration: 3000
                  })
                  console.log(error)
                }
              )
          }
        }
      )
  }
}
