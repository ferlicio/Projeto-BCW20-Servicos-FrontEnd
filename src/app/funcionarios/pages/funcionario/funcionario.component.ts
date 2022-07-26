import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Cargo } from '../../models/cargo';
import { Funcionario } from '../../models/funcionario';
import { CargosService } from '../../services/cargo.service';
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
  foto!: File // undefined
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private funcService: FuncionarioService,
    private cargoService: CargosService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router, // serve para fazer o redirecionamento entre as páginas do app pelo ts
    private title: Title
  ) { }

  ngOnInit(): void {
    // let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario')
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
          //1° pegar o funcionário que foi retornado e colocar dentro da propriedade funcionario
          this.recuperarCargos()
          this.funcionario = func
          /* console.log(this.funcionario.cargo) */

          // 2° pegar os dados do funcionário e atribuir esses valores aos seus respectivos campos
          // no formulário

          /**
           * setValue() é responsável por pegar os valores que foram passados para ela
           * e colocar dentro dos formControls
           */

          this.formFuncionario.setValue({
            nome: this.funcionario.nome,
            email: this.funcionario.email,
            foto: '',
            cargo: this.funcionario.cargo.idCargo
          })

          // 3° carregar o preview da imagem
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

    const reader = new FileReader() // objeto do js que faz leitura de arquivos

    reader.readAsDataURL(this.foto) // ler o arquivo e gerar um link local para o acesso do conteúdo daquele arquivo

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
    /**
     * valueChanges é uma propriedade dos FormGroups
     * que é um observable que quando um valor do seu formulário
     * altera, esse observable te retorna essa modificação
     */
    this.formFuncionario.valueChanges
      .subscribe(
        /**
         * o parâmetro valores é um objeto que é retornado te informando
         * o valor de cada campo do seu reative forms
         */
        (valores) => {
          /**
           * o botão será desabilitado se as validações do formulário estiverem inválidas
           * ou se o valor de algum campo do formulário estiver diferente do valor de alguma
           * propriedade do objeto funcionário
           */
          this.desabilitar = this.formFuncionario.invalid || !(valores.nome != this.funcionario.nome || valores.email != this.funcionario.email || valores.foto.length > 0 || valores.cargo != this.funcionario.cargo.idCargo)
        }
      )
  }

  salvarAtualizacoes() {
    const f: Funcionario = { ...this.formFuncionario.value }
    f.idFuncionario = this.funcionario.idFuncionario
    f.foto = this.funcionario.foto
    this.cargoService.getCargoById(this.formFuncionario.value.cargo).subscribe(
      (cargo) => {
        f.cargo = cargo
      }
    )

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
