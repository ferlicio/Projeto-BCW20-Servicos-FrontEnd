import { Funcionario } from '../../funcionarios/models/funcionario';
import { Pagamentos } from '../../pagamentos/models/pagamentos';
export interface Chamado {
    idChamado: number;
    titulo: string;
    descricao?: string,
    dataEntrada: string,
    status: string,
    idCliente: number,
    funcionario: Funcionario,
    pagamento: Pagamentos
}
