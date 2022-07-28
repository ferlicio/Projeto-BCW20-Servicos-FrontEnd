import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from 'src/app/funcionarios/components/confirmar-saida/confirmar-saida.component';
import { Clientes } from '../../models/clientes';
import { ClientesService } from '../../service/clientes.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
/* 
  cargos: Cargo[] = []
  cargoSelect: Cargo = { idCargo: 0, nome: '', descricao: '', salario: 0 } */
  salvandoCliente: boolean = false


  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    
  })






  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    
    private dialogRef: MatDialogRef<FormClientesComponent>, // objeto que permite controlar o dialog aberto
    private snackbar: MatSnackBar, // com esse objeto será criado um snackbar na tela
    private dialog: MatDialog


  ) { }

  ngOnInit(): void {
 /*    this.funcioanrioService.getCargos().subscribe(
      (cargs) => { // sucesso
        this.cargos = cargs

      }
    ) */

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
    this.salvandoCliente = true
    const f: Clientes = this.formCliente.value
    this.clienteService.postCliente(f).subscribe(
      success =>{
        this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
      
      
    )
           
 }
}

