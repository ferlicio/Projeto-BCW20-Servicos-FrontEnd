import { Funcionario } from '../../funcionarios/models/funcionario';
export interface Chamado {
    idChamado: number;
    titulo: string;
    descricao?: string,
    dataEntrada: Date,
    status: string,
    idCliente: number,
    idFuncionario: number,
    idPagamento: number
}
