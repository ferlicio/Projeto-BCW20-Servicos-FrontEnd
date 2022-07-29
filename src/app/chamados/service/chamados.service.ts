import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../model/chamado';
import { FuncionarioService } from '../../funcionarios/services/funcionario.service';
import { mergeMap, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/chamados';

  constructor(private http: HttpClient, private funcionarioService: FuncionarioService) { }


  getChamados() {
    return this.http.get<Chamado[]>(`${this.baseUrl}`);
  }

  getChamadoById(id: number) {
    return this.http.get<Chamado>(`${this.baseUrl}/${id}`)
  }

  deleteChamado(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  putChamado(chamado: Chamado, idChamado: number, idFuncionario?: number) {

    if (idFuncionario) {

      return this.funcionarioService.getFuncionarioById(idFuncionario).pipe(
        mergeMap(func => {

          chamado.funcionario = func;

          return this.http.put<Chamado>(`${this.baseUrl}/${idChamado}`, chamado)
        })
      )
    }
    return this.http.put<Chamado>(`${this.baseUrl}/${idChamado}`, chamado)
  }

  postChamado(chamado: Chamado, idCliente: number) {
    return this.http.post<Chamado>(`${this.baseUrl}/${idCliente}`, chamado)
  }

}
