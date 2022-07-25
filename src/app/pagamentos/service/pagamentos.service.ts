import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Pagamentos } from '../models/pagamentos';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {

  private readonly baseurl: string = 'http://localhost:8080/servicos/pagamentos'

  atualizarPagamentosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)


  constructor(private http: HttpClient) { }


  getPagamentos() {
    return this.http.get<Pagamentos[]>(this.baseurl);
  }

  getPagamentoID(id: number) {
    return this.http.get<Pagamentos>(`${this.baseurl}/${id}`)
  }

  deletePagamento(id: number) {
    return this.http.delete(`${this.baseurl}/${id}`)
  }

  postPagamento(pagamento: Pagamentos, cargo: number) {
    return this.http.post<Pagamentos>(`${this.baseurl}/${cargo}`, pagamento).pipe(tap(() => this.atualizarPagamentosSub$.next(true)))
  }

  putPagamento(pagamento: Partial<Pagamentos>) {
    return this.http.put<Pagamentos>(`${this.baseurl}/${pagamento.idPagamento}`, pagamento).pipe(tap(() => this.atualizarPagamentosSub$.next(true)))
  }

}
