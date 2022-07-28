import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cargo } from '../../../cargos/models/cargo';
import { CargosService } from '../../../cargos/services/cargo.service';

@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit {

  formCargo: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    descricao: [''],
    salario: ['', [Validators.required]]
  })

  salvandoCargo: boolean = false

  constructor(
    private fb: FormBuilder,
    private cargoService: CargosService,
    private dialogRef: MatDialogRef<FormCargoComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


/*   confirmarSaida() {
    this.dialog.open(ConfirmarSaidaComponent).afterClosed().subscribe(
      (res) => {
        if (res == true) {
          this.dialogRef.close()
        }
      }
    )
  } */

  salvar(): void {
    this.salvandoCargo = true
    const c: Cargo = this.formCargo.value

      this.cargoService.salvarCargo(c).subscribe(
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
