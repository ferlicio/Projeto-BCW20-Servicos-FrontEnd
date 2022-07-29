import { Funcionario } from '../../funcionarios/models/funcionario';
import { Pagamentos } from '../../pagamentos/models/pagamentos';
import { Clientes } from '../../clientes/models/clientes';
export interface Chamado {
    idChamado: number;
    titulo: string;
    descricao?: string,
    dataEntrada: string
    status: string,
    cliente: Clientes,
    funcionario: Funcionario,
    pagamento: Pagamentos
}
