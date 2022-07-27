import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Clientes } from '../../models/clientes';
import { ClientesService } from '../../service/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

cliente!: Clientes

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private title: Title,
    private clienteService: ClientesService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idCliente = parseInt(params.get('idCliente') ?? '0')
        this.title.setTitle('Cliente ' + idCliente)
        this.recuperarCliente(idCliente)
      }
    )
  }

  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required]],
        
  })

  desabilitar: boolean = true
  naoEncontrado: boolean = false

  recuperarCliente(id: number): void {
    this.clienteService.getClienteID(id)
      .subscribe(
        cliente => {
          this.cliente = cliente

          this.formCliente.setValue({
            nome: this.cliente.nome,
            email: this.cliente.email,
           
          })
          this.valorMudou()

        })

  }

  salvarAtualizacoes() {
    const cliente: Clientes = { ...this.formCliente.value }
    cliente.idCliente = this.cliente.idCliente


    this.clienteService.putCliente(cliente).subscribe(
      (resultado) => {
        this.snack.open('Cliente alterado com sucesso', 'Ok', { duration: 3000 });
        this.recuperarCliente(cliente.idCliente)
      }

    )

  }


  valorMudou() {
    this.desabilitar = true;
    this.formCliente.valueChanges
      .subscribe(
        (clientes) => {
          console.log(clientes)
          this.desabilitar = this.formCliente.invalid 
          || !(clientes.nome != this.cliente.nome 
          || clientes.email != this.cliente.email)
        }
      )
  }


}
