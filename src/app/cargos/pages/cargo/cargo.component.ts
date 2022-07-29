import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { Cargo } from '../../models/cargo';
import { CargosService } from '../../../cargos/services/cargo.service';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  cargo!: Cargo

  formCargo: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    descricao: [''],
    salario: ['', [Validators.required]]
  })

  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(    
  private route: ActivatedRoute, // acessar os parâmetros da rota ativa
  private cargoService: CargosService,
  private fb: FormBuilder,
  private snackbar: MatSnackBar,
  private dialog: MatDialog,
  private router: Router, // serve para fazer o redirecionamento entre as páginas do app pelo ts
  private title: Title) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
        let idCargo = parseInt(params.get('idCargo') ?? '0')
        this.title.setTitle('Cargo ' + idCargo)
        this.recuperarCargo(idCargo)
      }
    )
  }

  recuperarCargo(id: number): void {
    this.cargoService.getCargoById(id)
      .subscribe(
        cargs => {
          this.cargo = cargs

          this.formCargo.setValue({
            nome: this.cargo.nome,
            descricao: this.cargo.descricao,
            salario: this.cargo.salario
          })
          this.valorMudou()
        },
        (erro: HttpErrorResponse) => {
          this.naoEncontrado = erro.status == 404
        }
      )
  }

  valorMudou() {
    this.formCargo.valueChanges
      .subscribe(
        (valores) => {
          this.desabilitar = this.formCargo.invalid || !(valores.nome != this.cargo.nome || valores.descricao != this.cargo.descricao || valores.salario != this.cargo.salario)
        }
      )
  }
  
  salvarAtualizacoes() {
    const c: Cargo = { ...this.formCargo.value}
    c.idCargo = this.cargo.idCargo

    const obsSalvar: Observable<any> = this.cargoService.atualizarCargo(c)

    obsSalvar
      .subscribe(
        (resultado) => {
          if (resultado instanceof Observable<Cargo>) {
            resultado
              .subscribe(
                (func) => {
                  this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
                    duration: 3000
                  })
                  console.log("YOLO")
                  this.recuperarCargo(func.idCargo)
                }
              )
          }

          this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
            duration: 3000
          })

          this.recuperarCargo(resultado.idCargo)
        }
      )
  }

  deletar(): void {
    this.dialog.open(ConfirmarDelecaoComponent)
      .afterClosed()
      .subscribe(
        (deletar) => {
          if (deletar) {
            this.cargoService.deleteCargo(this.cargo)
              .subscribe(
                () => {
                  this.snackbar.open('Cargo deletado', 'Ok', {
                    duration: 3000
                  })

                  this.router.navigateByUrl('/cargos')
                }
              )
          }
        }
      )
  }
}
