import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from 'src/app/cargos/models/cargo';
import { Chamado } from '../model/chamado';
import { Clientes } from 'src/app/clientes/models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/chamados';

  constructor(private http: HttpClient) { }


  getChamados() {
    return this.http.get<Chamado[]>(`${this.baseUrl}`);
  }

  getChamadoById(id: number) {
    return this.http.get<Chamado>(`${this.baseUrl}/${id}`)
  }

  deleteChamado(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  putCargo(chamado: Partial<Chamado>) {
    return this.http.put<Chamado>(`${this.baseUrl}/${chamado.idChamado}`, chamado)
  }

  postChamado(chamado: Chamado, idCliente: number) {
    return this.http.post<Chamado>(`${this.baseUrl}/${idCliente}`, chamado)
  }

}
