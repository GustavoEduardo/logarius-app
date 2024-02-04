export interface IComanda {
  comanda_id: string;
  titulo: string;
  observacao?: string;
  valorTotal: number;
  valorPago: number;
  itens: [
    { nome: string; valor: number },
    { nome: string; valor: number },
    { nome: string; valor: number },
    { nome: string; valor: number },
    { nome: string; valor: number }
  ];
  status: string;
}
