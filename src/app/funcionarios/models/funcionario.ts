import { Cargo } from "../../cargos/models/cargo"

export interface Funcionario {
  idFuncionario?: number
  nome: string
  email: string
  foto: string
  cargo: Cargo
}
