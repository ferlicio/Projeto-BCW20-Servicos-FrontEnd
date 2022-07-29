import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, tap } from 'rxjs';
import { Clientes } from '../models/clientes';
import { EnderecoCliente } from '../models/enderecoCliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  atualizarClientesSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)


  private readonly baseurl: string = 'http://localhost:8080/servicos/clientes'
  private readonly baseurl2: string = 'http://localhost:8080/servicos/enderecoCliente'


  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get<Clientes[]>(this.baseurl);
  }

  getClienteID(id: number) {
    return this.http.get<Clientes>(`${this.baseurl}/${id}`)
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.baseurl}/${id}`)
  }

  postCliente(cliente: Clientes, endereco: EnderecoCliente) {
    return this.http.post<Clientes>(`${this.baseurl}`, cliente).pipe(mergeMap(
      (a) => {
        return this.http.post<EnderecoCliente>(`${this.baseurl2}/${a.idCliente}`, endereco)
      }
    ))
  }

  putCliente(cliente: Clientes, endereco: EnderecoCliente) {
    return this.http.put<EnderecoCliente>(`${this.baseurl2}/${cliente.idCliente}`, endereco).pipe(mergeMap(
      (a) => {
        cliente.enderecoCliente = a
        return this.http.put<Clientes>(`${this.baseurl}/${cliente.idCliente}`, cliente).pipe(tap(() => this.atualizarClientesSub$.next(true)))
      }
    ))

  }

}
