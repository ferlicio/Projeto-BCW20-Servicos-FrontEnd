import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cargo } from '../../../cargos/models/cargo';
import { Funcionario } from '../../models/funcionario';
import { CargosService } from '../../../cargos/services/cargo.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { ConfirmarSaidaComponent } from '../../../components/confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.css']
})
export class FormFuncionarioComponent implements OnInit {

  cargos: Cargo[] = []
  cargoSelect: Cargo = { idCargo: 0, nome: '', descricao: '', salario: 0 }



  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: ['']
  })

  foto!: File
  fotoPreview: string = ''
  salvandoFuncionario: boolean = false

  constructor(
    private fb: FormBuilder,
    private funcService: FuncionarioService,
    private cargoService: CargosService,
    private dialogRef: MatDialogRef<FormFuncionarioComponent>, // objeto que permite controlar o dialog aberto
    private snackbar: MatSnackBar, // com esse objeto será criado um snackbar na tela
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.cargoService.getCargos().subscribe(
      (cargs) => { // sucesso
        this.cargos = cargs

      }
    )
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]
    this.carregarPreview()
  }


  carregarPreview(): void {
    const reader = new FileReader()

    reader.readAsDataURL(this.foto)

    reader.onload = () => {
      this.fotoPreview = reader.result as string
    }
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
    this.salvandoFuncionario = true
    const f: Funcionario = this.formFuncionario.value

    if (this.formFuncionario.value.foto.length > 0) {
      this.funcService.salvarFuncionario(f, this.cargoSelect, this.foto).subscribe(
        (next) => {
          this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.dialogRef.close()
        },
        error => console.log(error),

      )
    } else {
      this.funcService.salvarFuncionario(f, this.cargoSelect, undefined).subscribe(
        (next) => {
          this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.dialogRef.close()
        },
        (error) => { console.log(error) }
      )
    }
  }
}
