import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChamadosService } from '../../service/chamados.service';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.css']
})
export class ListarChamadosComponent implements OnInit {

  displayedColumns: string[] = ['idChamado', 'titulo', 'descricao', 'dataEntrada', 'status', 'idFuncionario', 'idCliente', 'idPagamento'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private chamadoService: ChamadosService) { }

  ngOnInit(): void {
    this.recuperarChamados();
  }

  recuperarChamados() {
    this.chamadoService.getChamados().subscribe(
      chamados => {
        this.dataSource = new MatTableDataSource(chamados)
        console.log(chamados)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error => {
        console.log(error)
      }
    )
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


