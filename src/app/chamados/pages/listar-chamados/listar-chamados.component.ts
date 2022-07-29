import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChamadosService } from '../../service/chamados.service';
import { Chamado } from '../../model/chamado';
import { FormChamadosComponent } from '../../components/form-adicionar-chamados/form-chamados.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletarChamadoComponent } from '../../components/deletar-chamado/deletar-chamado.component';
import { AlterarChamadoComponent } from '../../components/alterar-chamado/alterar-chamado.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.css']
})
export class ListarChamadosComponent implements OnInit {

  displayedColumns: string[] = ['idChamado', 'titulo', 'descricao', 'dataEntrada', 'status', 'funcionario.nome', 'cliente.nome', 'pagamento.status', 'actions'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private chamadoService: ChamadosService,
    private dialogChamado: MatDialog,
    private snackBar: MatSnackBar,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.recuperarChamados();
    this.title.setTitle("Chamados")
  }

  recuperarChamados() {
    this.chamadoService.getChamados().subscribe(
      chamados => {
        chamados = chamados.map((x) => {
          if (x.pagamento == null) {
            x.pagamento = { idPagamento: 999999, valor: 0, formPagamento: 'não existe', statusPagamento: 'não cadastrado' }
            return x;
          }
          return x;
        })
        this.dataSource = new MatTableDataSource(chamados)
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (chamado: Chamado, filter: string) => {
          return chamado.funcionario.nome.toLocaleLowerCase().includes(filter) ||
            chamado.pagamento.statusPagamento.toLocaleLowerCase().includes(filter) ||
            chamado.titulo.toLocaleLowerCase().includes(filter) ||
            chamado.descricao!.toLocaleLowerCase().includes(filter) ||
            chamado.idChamado.toExponential().includes(filter) ||
            chamado.status.toLocaleLowerCase().includes(filter) ||
            chamado.dataEntrada.toLocaleLowerCase().includes(filter)
        }
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'funcionario.nome': return item.funcionario.nome;
            case 'cliente.nome': return item.cliente.nome;
            case 'pagamento.status': return item.pagamento.statusPagamento;
            default: return item[property];
          }
        }

        this.dataSource.sort = this.sort;

      },

      error => {
        this.snackBar.open("Erro ao recuperar chamados", "Ok", { duration: 3000 })
      }
    )
  }



  excluirChamado(chamado: Chamado): void {

    const dialogRef = this.dialogChamado.open(DeletarChamadoComponent)

    dialogRef.afterClosed()
      .subscribe(
        (deletar) => {

          if (deletar == true) {
            this.chamadoService.deleteChamado(chamado.idChamado)
              .subscribe(
                () => {
                  this.snackBar.open('Chamado deletado com sucesso', 'Ok', {
                    duration: 3000
                  })
                  this.recuperarChamados()
                },
                (error) => {
                  this.snackBar.open('Não foi possível deletar o chamado', 'Ok', {
                    duration: 3000
                  })
                  console.log(error)
                }
              )
          }
        }
      )
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirFormCadastroChamado(): void {
    const formDialog = this.dialogChamado.open(FormChamadosComponent)
    formDialog.afterClosed().subscribe(
      () => {
        this.recuperarChamados()
      }
    )
  }

  abrirFormAlterarChamado(chamado: Chamado) {
    const formDialog = this.dialogChamado.open(AlterarChamadoComponent, {
      data: chamado
    })
    formDialog.afterClosed().subscribe(
      () => {
        this.recuperarChamados()
      }
    )
  }
}
