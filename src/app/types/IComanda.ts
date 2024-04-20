export interface IComanda {
  comanda_id: string;
  titulo: string;
  observacao?: string;
  status_comanda: string;
  valor_pago: number;
  produtos: {produto_id: string, nome: string; preco: number, quantidade: number }[];
  valor: number;
  valor_final: number;
  valor_desconto: number;
}

// valor, valor_final e valor_desconto são para a venda!
