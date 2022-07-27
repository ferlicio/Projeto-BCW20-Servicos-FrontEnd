import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  atualizarClientesSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)


  private readonly baseurl: string = 'http://localhost:8080/servicos/clientes'


  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get<Clientes[]>(this.baseurl);
  }

  getClienteID(id: number) {
    return this.http.get<Clientes>(`${this.baseurl}/${id}`)
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.baseurl}/${id}`)
  }

  postCliente(cliente: Clientes) {
    return this.http.post<Clientes>(`${this.baseurl}`, cliente)
  }

  putCliente(cliente: Partial<Clientes>) {
    return this.http.put<Clientes>(`${this.baseurl}/${cliente.idCliente}`, cliente).pipe(tap(() => this.atualizarClientesSub$.next(true)))
  }

}
