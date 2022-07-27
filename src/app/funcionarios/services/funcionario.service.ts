import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, mergeMap, Observable, tap } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cargo } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/funcionarios'
  atualizarFuncionariosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }

  getFuncionarios(): Observable<Funcionario[]> {

    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  deleteFuncionario(func: Funcionario): Observable<any> {

    if (func.foto != null && func.foto.length > 0) {

      return this.storage.refFromURL(func.foto).delete()
        .pipe(
          mergeMap(() => {

            return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`)
          })
        )
    }

    return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`)
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }

  getFuncionariosByEmail(email: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}Email/${email}`)
  }

  getFuncionariosByCargo(idCargo: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}DoCargo/${idCargo}`)
  }

  salvarFuncionario(func: Funcionario, cargo: Cargo, foto?: File): Observable<Funcionario> {

    if (foto == undefined) {
      return this.http.post<Funcionario>(`${this.baseUrl}/${cargo.idCargo}`, func)

    }
    return this.uploadImagem(foto).pipe(mergeMap(dadosFoto => {
      func.foto = dadosFoto;
      return this.http.post<Funcionario>(`${this.baseUrl}/${cargo.idCargo}`, func).pipe(mergeMap(res => { return this.atualizarFuncionario(res, res.cargo, foto) }))
    }))
  }

  atualizarFuncionario(func: Funcionario, cargo: any, foto?: File): Observable<Funcionario> {
    func.cargo = cargo
    if (foto == undefined) {
      return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func)
        .pipe(
          tap((funcionario) => {
            this.atualizarFuncionariosSub$.next(true)
          })
        )
    }


    if (func.foto.length > 0) {
      const inscricao = this.storage.refFromURL(func.foto).delete()
        .subscribe(
          () => {
            inscricao.unsubscribe()
          }
        )
    }

    return this.uploadImagem(foto).pipe(mergeMap((fotoFire) => {
      func.foto = fotoFire
      return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func)
    }))
  }


  private uploadImagem(foto: File): Observable<string> {
    const nomeDoArquivo = Date.now()
    const dados = from(this.storage.upload(`${nomeDoArquivo}`, foto))
    return dados.pipe(mergeMap(dadosFoto => { return dadosFoto.ref.getDownloadURL() }))
  }
}
