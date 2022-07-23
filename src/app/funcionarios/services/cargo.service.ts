import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cargo } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/cargos'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.baseUrl)
  }

  getCargoById(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.baseUrl}/${id}`)
  }

}
