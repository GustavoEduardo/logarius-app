import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IComanda } from '../../types/IComanda';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Helpers } from '../../shared/helpers';
import { ComandaService } from '../../services/comanda.service';
import { ToastrService } from 'ngx-toastr';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ProdutoService } from '../../services/produto.service';
import { IProduto } from '../../types/IProduto';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'

@Component({
  selector: 'app-comandas',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NzDropDownModule,
    NzListModule,
    NzModalModule,
    NzInputNumberModule,
    NzIconModule,
    NzSliderModule,
    NzBadgeModule,
    NzCheckboxModule
  ],
  templateUrl: './comandas.component.html',
  styleUrl: './comandas.component.scss',
})
export default class ComandasComponent extends Helpers implements OnInit {
  pagination: any = {
    perPage: 50,
    currentPage: 1,
    last_page: 1,
    total: 50,
    from: 1,
    to: 1,
  };

  loadingBt = false;

  params: any = {
    pageIndex: 1,
    pageSize: 50,
    sort: [],
    filter: [],
  };
  qtdFiltrosAtivos = 0;
  modalFiltrarVisible = false;
  expand = false;
  queryString = '';
  timeSearchId: any = null;

  modalAddVisible = false;
  modalDetalhesVisible = false;
  modalPagarVisible = false;
  modalAddItemVisible = false;
  comandaSelecionada: IComanda | null = null;

  comandas: IComanda[] = [];

  produtos: any = [];

  itensParaAdicionar: any = [];

  valorParaPagar = 0;

  produtoIdParaAdicionar: any = null;
  qtdParaAdicionar = 1;
  valor_finalParaAdd = 0;

  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private comandaService: ComandaService,
    private modal: NzModalService
  ){
    super()
  }

  formAdicionar = this.fb.group({
    titulo: [null, Validators.required],
    observacao: [null],
  });

  checkOptions = [
    { label: 'Aberta', value: 'Aberta', checked: true },
    { label: 'Fechada', value: 'Fechada' , checked: false },
    { label: 'Cancelada', value: 'Cancelada', checked: false }
  ];

  formFiltrar = this.fb.group({
    pesquisa: [null],
    status_comanda: [this.checkOptions]
  });

  qtdToRemove = 1;
  qtdMaxRemove = 1;

  coresComanda: any = {
    'Aberta': '#f0ad4e',
    'Fechada': '#0275d8',
    'Cancelada': '#d9534f'
  }

  ngOnInit() {
    this.listar();
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.get().subscribe({
      next: (res) => {
        this.produtos = res.result;
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao listar produtos.');
      },
    });
  }

  listar() {
    this.loadingBt = true;
    const f = this.filtrar(this.formFiltrar, this.params, this.pagination);

    this.qtdFiltrosAtivos = f.qtdFiltrosAtivos;

    this.comandaService.get(f.queryString).subscribe({
      next: (res) => {
        this.comandas = res.result.data;

        this.loadingBt = false;

        this.showModalFiltrar(false);

        this.pagination = {
          perPage: Number(res.result.pagination.perPage),
          currentPage: Number(res.result.pagination.currentPage),
          from: Number(res.result.pagination.from) || 1,
          to: Number(res.result.pagination.to),
          lastPage: Number(res.result.pagination.lastPage),
          total: Number(res.result.pagination.total),
        };
      },
      error: (err) => {
        this.loadingBt = false;
        this.toastr.error(err.error?.message || 'Erro ao listar produtos.');
      },
    });
  }

  filtrar(
    form?: FormGroup,
    params?: NzTableQueryParams,
    pagination?: any
  ): { qtdFiltrosAtivos: number; queryString: string } {
    this.params.pageIndex = 1;
    let qtdFiltrosAtivos = 0;
    let queryString = '';

    let status: any = null;
    
    if (this.formFiltrar.value.status_comanda) {
      this.formFiltrar.value.status_comanda!.forEach( (s: { checked: any; value: any; }) => {
        if (s.checked) {
            status = status ? status + ',' + s.value : s.value;
        }
      })
    }  

    for (let [key, value] of Object.entries(form?.value)) {
      if (key === 'status_comanda' && status){

        qtdFiltrosAtivos += 1;

        queryString += `&${key}=${status}`;

      }else if (value && key !== 'status_comanda') {
        qtdFiltrosAtivos =
        key !== 'pesquisa' ? qtdFiltrosAtivos + 1 : qtdFiltrosAtivos;

        queryString += `&${key}=${value}`;
        
      }
    }

    if (params)
      // adiciona ordem
      for (let s of params.sort) {
        if (s.value) {
          queryString += `&ordem=${s.key}&tipo_ordem=${s.value}`;
        }
      }

      if (pagination?.currentPage) {
        // adiciona páginação
        queryString += `&currentPage=${this.pagination.currentPage}`;
      }

      if (pagination?.perPage) {
        queryString += `&perPage=${this.pagination.perPage}`;
      }

    queryString = queryString.replace('&', '?');

    return { qtdFiltrosAtivos, queryString };
  }

  buscar() {
    window.clearTimeout(this.timeSearchId);

    this.timeSearchId = setTimeout(() => {
      this.pagination.currentPage = 1;
      this.listar();
    }, 900);
  }

  resetSearch() {
    this.params = {
      pageIndex: 1,
      pageSize: 50,
      sort: [],
      filter: [],
    };

    this.formFiltrar.reset();

    this.checkOptions[0].checked = true;
    this.checkOptions[1].checked = false;
    this.checkOptions[2].checked = false;

    this.formFiltrar.value.status_comanda = this.checkOptions;

    this.pagination.currentPage = 1;

    this.listar();
  }

  showModalAdicionar() {
    this.modalAddVisible = !this.modalAddVisible;

    if (!this.modalAddVisible) {
      this.formAdicionar.reset();
    }
  }

  adicinarComanda() {
    if (this.formAdicionar.valid) {
      this.loadingBt = true;
      this.comandaService.create(this.formAdicionar.value).subscribe({
        next: (res) => {
          this.comandas = res.result.data;
          this.toastr.success('Comanda criada com sucesso.');
          this.listar();
          this.showModalAdicionar();
        },
        error: (err) => {
          this.loadingBt = false;
          this.toastr.error(
            err.error?.message || 'Erro ao tentar fechar a venda.'
          );
        },
      });
    } else {
      Object.values(this.formAdicionar.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showModalDetalhes(c: IComanda | null = null) {
    this.comandaSelecionada = c;
    this.modalDetalhesVisible = !this.modalDetalhesVisible;
  }

  showModalPagar(c: IComanda | null = null) {
    this.valorParaPagar =  this.modalPagarVisible ? 0 : this.valorParaPagar;
    this.comandaSelecionada = c;
    this.modalPagarVisible = !this.modalPagarVisible;
  }

  showModalAddItem(c: IComanda | null = null) {
    this.comandaSelecionada = c;
    this.modalAddItemVisible = !this.modalAddItemVisible;

    if (!this.modalAddItemVisible) {
      this.produtoIdParaAdicionar = null;
      this.qtdParaAdicionar = 1;
      this.itensParaAdicionar = [];
      this.valor_finalParaAdd = 0;
    }
  }

  adicionarItem() {
    let existe = false;

    const p = this.produtos.find(
      (p: any) => p.produto_id === this.produtoIdParaAdicionar
    );

    if (this.comandaSelecionada) {
      const toUpdate = this.comandaSelecionada;

      toUpdate.produtos.forEach((item: any) => {
        if (item.produto_id === this.produtoIdParaAdicionar) {
          item.quantidade += this.qtdParaAdicionar;
          existe = true;
        }
      });

      if (!existe) {
        toUpdate.produtos.push({
          produto_id: this.produtoIdParaAdicionar,
          quantidade: this.qtdParaAdicionar,
          ...p,
        });
      }

      toUpdate.valor = Number(toUpdate.valor) + p.preco * this.qtdParaAdicionar;

      toUpdate.valor_final = toUpdate.valor; // Valor da venda

      this.produtoIdParaAdicionar = null;
      this.qtdParaAdicionar = 1;

      this.update(toUpdate);
    }
  }

  confirmRemoverItem(produto_id: string, nzContent: TemplateRef<{}>) {
    this.qtdToRemove = 1;
    this.qtdMaxRemove = 1;

    const produto = this.modalDetalhesVisible
      ? this.comandaSelecionada?.produtos.find(
          (p) => p.produto_id === produto_id
        )
      : this.itensParaAdicionar?.find(
          (p: IProduto) => p.produto_id === produto_id
        );

    this.qtdToRemove = produto.quantidade;
    this.qtdMaxRemove = produto.quantidade;

    const nzTitle =
      produto.quantidade === 1
        ? 'Tem certeza que deseja remover o item?'
        : 'Selecione a quantidade para remover';

    const modal: NzModalRef = this.modal.create({
      nzTitle,
      nzContent,
      nzWidth: 350,
      nzFooter: [
        {
          label: 'Cancelar',
          onClick: () => modal.destroy(),
        },
        {
          label: 'Confirmar',
          type: 'primary',
          onClick: () => {
            this.removerItem(produto_id);
            modal.destroy();
          },
        },
      ],
    });
  }

  removerItem(produto_id: string) {
    if (this.comandaSelecionada) {
      const toUpadate = this.comandaSelecionada;
      toUpadate.valor = 0;

      for (let i = 0; i < toUpadate.produtos.length; i++) {
        if (toUpadate.produtos[i].produto_id === produto_id) {
          if (this.qtdToRemove === toUpadate.produtos[i].quantidade) {
            toUpadate.produtos.splice(i, 1);
          } else {
            toUpadate.produtos[i].quantidade -= this.qtdToRemove;
          }

          toUpadate.valor +=
            toUpadate.produtos[i].preco * toUpadate.produtos[i].quantidade;
        }
      }

      toUpadate.valor_final = toUpadate.valor;

      this.update(toUpadate);
    }
  }

  pagarComanda(comandaId: string) {
    const comanda: any = this.comandas.find((c) => c.comanda_id === comandaId);

    const c = {...comanda};

    const valorRestante = Number(c.valor_final) - Number(c.valor_pago);

    if (this.valorParaPagar > valorRestante) {
      this.toastr.error('Valor informado maior que o valor restante.');
      return;
    } else if (this.valorParaPagar <= 0) {
      this.toastr.error('Valor informado deve ser maior que 0.');
      return;
    } else if (this.valorParaPagar === valorRestante) {
      c.valor_pago = Number(c.valor_pago) + this.valorParaPagar;
      this.showModalPagar();
      this.confirmFechar(c);
    } else {
      c.valor_pago = Number(c.valor_pago) + this.valorParaPagar;

      this.update(c, true, false);
      this.showModalPagar();
    }
  }

  confirmFechar(c: IComanda) {
    const nzTitle = `Fechar Comanda?`;

    const modal: NzModalRef = this.modal.create({
      nzTitle,
      nzContent:
        'O valor informado corresponde ao total da comanda. Deseja fecha-la?',
      nzWidth: 550,
      nzFooter: [
        {
          label: 'Pagar manter aberta',
          onClick: () => {
            modal.destroy();
            this.update(c, true, false);
          },
        },
        {
          label: 'Fechar Comanda',
          type: 'primary',
          onClick: () => {
            modal.destroy();
            this.fecharComanda(c.comanda_id);
          },
        },
      ],
    });
  }

  fecharComanda(comandaId: string) {
    const comanda: IComanda | any = this.comandas.find(
      (c) => c.comanda_id === comandaId
    );
    const c = {...comanda};
    c.valor_pago = Number(c.valor_pago) + this.valorParaPagar;
    c.status_comanda = 'Fechada';

    const valorRestante = Number(c.valor_final) - Number(c.valor_pago);

    if (valorRestante) {
      this.confirmDesconto(c, valorRestante);
    } else {
      this.update(c, false, false);
      this.showModalPagar();
    }
  }

  confirmDesconto(c: IComanda, desconto: number) {
    const nzTitle = `Dar desconto?`;

    const modal: NzModalRef = this.modal.create({
      nzTitle,
      nzContent: `Restam R$ ${desconto} para o total da comanda. Fechar a venda com esse desconto?`,
      nzWidth: 550,
      nzFooter: [
        {
          label: 'Voltar',
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: 'Fechar com desconto',
          type: 'primary',
          onClick: () => {
            c.valor_desconto = desconto;
            modal.destroy();
            this.update(c, false, false);
            this.showModalPagar();
          },
        },
      ],
    });
  }

  // apenasComanda = true não atualizará a venda
  update(comanda: IComanda, apenasComanda = false, silent = true) {
    this.loadingBt = true;
    this.comandaService.update(comanda, apenasComanda).subscribe({
      next: (res) => {
        this.comandas = res.result.data;
        if (!silent){
          this.toastr.success('Operação realizada com sucesso.');
        }
        this.listar();
        this.listarProdutos(); // para trazer lista com estoques atualizados
      },
      error: (err) => {
        this.loadingBt = false;
        this.toastr.error(
          err.error?.message || 'Erro ao tentar realizar operação.'
        );
        this.listar();
        this.listarProdutos();
        this.showModalDetalhes();
      },
    });
  }

  confirmCancelar(c: IComanda) {
    const nzTitle = `Dar desconto?`;

    const modal: NzModalRef = this.modal.create({
      nzTitle,
      nzContent: `Deseja meso cancelar a comanda "${c.titulo}" ?`,
      nzWidth: 350,
      nzFooter: [
        {
          label: 'Não',
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: 'Sim',
          type: 'primary',
          onClick: () => {
            this.cancelar(c.comanda_id);
            modal.destroy();
          },
        },
      ],
    });
  }

  cancelar(id: string){

    this.loadingBt = true;

    this.comandaService.cancelar(id).subscribe({
      next: (res) =>{
        this.loadingBt = false;
        this.toastr.success(res.message || 'Comanda cancelada.');
        this.listar();
      },
      error: (err) =>{
        this.loadingBt = false;
        this.toastr.error(err.error.message || 'Falha ao tentar cancelar a comanda.');
      }
    })

  }

  showModalFiltrar(visible = !this.modalFiltrarVisible) {
    this.modalFiltrarVisible = visible
  }
}
