import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Cargo } from '../../../cargos/models/cargo';
import { Funcionario } from '../../models/funcionario';
import { CargosService } from '../../../cargos/services/cargo.service';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  cargos?: Cargo[] = [{ idCargo: 0, nome: '', descricao: '', salario: 0 }]
  funcionario!: Funcionario

  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: [''],
    cargo: ['']
  })

  imagePreview: string = ''
  foto!: File
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    private route: ActivatedRoute, 
    private funcService: FuncionarioService,
    private cargoService: CargosService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router, 
    private title: Title
  ) { }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(
      (params) => {
        let idFuncionario = parseInt(params.get('idFuncionario') ?? '0')
        this.title.setTitle('Funcionario ' + idFuncionario)
        this.recuperarFuncionario(idFuncionario)
      }
    )

  }

  recuperarFuncionario(id: number): void {
    this.funcService.getFuncionarioById(id)
      .subscribe(
        func => {
          this.recuperarCargos()
          this.funcionario = func


          this.formFuncionario.setValue({
            nome: this.funcionario.nome,
            email: this.funcionario.email,
            foto: '',
            cargo: this.funcionario.cargo.idCargo
          })
          this.imagePreview = this.funcionario.foto

          this.valorMudou()
        },
        (erro: HttpErrorResponse) => {
          this.naoEncontrado = erro.status == 404
        }
      )
  }


  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(this.foto)

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
  }

  recuperarCargos(): void {
    this.cargoService.getCargos()
      .subscribe(
        cargos => {
          this.cargos = cargos
        }
      )
  }

  valorMudou() {

    this.formFuncionario.valueChanges
      .subscribe(

        (valores) => {

          this.desabilitar = this.formFuncionario.invalid || !(valores.nome != this.funcionario.nome || valores.email != this.funcionario.email || valores.foto.length > 0 || valores.cargo != this.funcionario.cargo.idCargo)
        }
      )
  }

  salvarAtualizacoes() {
    const f: Funcionario = { ...this.formFuncionario.value, cargo: { idCargo: this.formFuncionario.value.cargo } }
    f.idFuncionario = this.funcionario.idFuncionario
    f.foto = this.funcionario.foto

    const temFoto = this.formFuncionario.value.foto.length > 0
    const obsSalvar: Observable<any> = this.funcService.atualizarFuncionario(f, f.cargo, temFoto ? this.foto : undefined)

    obsSalvar
      .subscribe(
        (resultado) => {
          if (resultado instanceof Observable<Funcionario>) {
            resultado
              .subscribe(
                (func) => {
                  this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
                    duration: 3000
                  })

                  this.recuperarFuncionario(func.idFuncionario)
                }
              )
          }

          this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
            duration: 3000
          })

          this.recuperarFuncionario(resultado.idFuncionario)
        }
      )
  }

  deletar(): void {
    this.dialog.open(ConfirmarDelecaoComponent)
      .afterClosed()
      .subscribe(
        (deletar) => {
          if (deletar) {
            this.funcService.deleteFuncionario(this.funcionario)
              .subscribe(
                () => {
                  this.snackbar.open('Funcionário deletado', 'Ok', {
                    duration: 3000
                  })

                  this.router.navigateByUrl('/funcionarios')
                }
              )
          }
        }
      )
  }
}
