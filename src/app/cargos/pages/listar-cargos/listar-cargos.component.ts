import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CargosService } from '../../services/cargo.service';
import { Cargo } from '../../models/cargo';

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css']
})
export class ListarCargosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'salario', 'actions'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cargoService: CargosService) {
  }

  ngOnInit(): void {
    this.recuperarCargos();
  }

  recuperarCargos() {
    this.cargoService.getCargos().subscribe(
      cargos => {
        console.log(cargos)
        this.dataSource = new MatTableDataSource(cargos)
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (cargo: Cargo, filter: string) => {
          return cargo.idCargo.toExponential().includes(filter) ||
            cargo.nome.toLocaleLowerCase().includes(filter) ||
            cargo.descricao!.toLocaleLowerCase().includes(filter) ||
            cargo.salario.valueOf().toString().includes(filter) 
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
        console.log(error)
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
}
