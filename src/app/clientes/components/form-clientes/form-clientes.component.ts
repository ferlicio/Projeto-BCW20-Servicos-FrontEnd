import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from 'src/app/components/confirmar-saida/confirmar-saida.component';
import { Clientes } from '../../models/clientes';
import { EnderecoCliente } from '../../models/enderecoCliente';
import { ClientesService } from '../../service/clientes.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {

  salvandoCliente: boolean = false


  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required]]

  })


  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,

    private dialogRef: MatDialogRef<FormClientesComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog


  ) { }

  ngOnInit(): void {

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
    const endereco: EnderecoCliente = this.formCliente.value

    this.clienteService.postCliente(f, endereco).subscribe(
      success => {
        this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }


    )

  }
}

