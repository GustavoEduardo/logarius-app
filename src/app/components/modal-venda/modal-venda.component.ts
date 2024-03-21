import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { Helpers } from '../../shared/helpers';
import { NzListModule } from 'ng-zorro-antd/list';
import { ToastrService } from 'ngx-toastr';
import { MetodoPagamentoService } from '../../services/metodo_pagamento.service';
import { ProdutoService } from '../../services/produto.service';
import { VendaService } from '../../services/venda.service';
import { NgxMaskDirective } from 'ngx-mask';
@Component({
  selector: 'app-modal-venda',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NzModalModule,
    NzInputNumberModule,
    NzListModule,
  ],
  templateUrl: './modal-venda.component.html',
  styleUrl: './modal-venda.component.scss',
})
export class ModalVendaComponent extends Helpers {
  @Output() showModal = new EventEmitter<boolean>();

  modalVendaVisible = false;

  clientes: any = [];
  metodos_pagamento: any = [];

  produtos: any = [];

  itensDaVenda: any = [];

  // Lógica de adicionar itens a venda
  produtoIdParaAdicionar: any = null;
  qtdParaAdicionar = 1;
  valorTotalVenda = 0;

  maxDescontoPorcentagem = 100;

  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  metodoPagemantoService = inject(MetodoPagamentoService);
  produtoService = inject(ProdutoService);
  vendaService = inject(VendaService);

  formNovaVenda = this.fb.group({
    cliente_id: [null, Validators.required],
    metodo_pagamento_id: [null, Validators.required],
    valor: [0],
    valor_desconto: [0],
  });

  ngOnInit() {
    this.clientes = [
      {
        cliente_id: '26b2e433-3e08-47e9-a10b-f5617612044f',
        nome: 'Indefinido',
      },
    ];

    this.listProdutos();
    this.listMetodosPagamento();
  }

  showModalNovaVenda() {
    this.modalVendaVisible = !this.modalVendaVisible;

    if (!this.modalVendaVisible) this.formNovaVenda.reset();
  }

  listMetodosPagamento() {
    this.metodoPagemantoService.get().subscribe({
      next: (res) => {
        this.metodos_pagamento = res.result;
      },
      error: (err) => {
        this.toastr.error(
          err.error.message || 'Erro ao listar métodos de pagamento.'
        );
      },
    });
  }

  listProdutos() {
    this.produtoService.get().subscribe({
      next: (res) => {
        this.produtos = res.result;
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Erro ao listar produtos.');
      },
    });
  }

  adicionarItem() {
    let existe = false;

    const p = this.produtos.find(
      (p: any) => p.produto_id === this.produtoIdParaAdicionar
    );

    this.itensDaVenda.forEach((item: any) => {
      if (item.produto_id === this.produtoIdParaAdicionar) {
        item.quantidade += this.qtdParaAdicionar;
        existe = true;
      }
    });

    if (!existe) {
      this.itensDaVenda.push({
        produto_id: this.produtoIdParaAdicionar,
        quantidade: this.qtdParaAdicionar,
        ...p,
      });
    }

    this.valorTotalVenda += p.preco * this.qtdParaAdicionar;

    this.produtoIdParaAdicionar = null;
    this.qtdParaAdicionar = 1;
  }

  removerItem(produto_id: string) {
    let index = 0;

    for (let [i, p] of this.itensDaVenda.entries()) {
      if (p.produto_id === produto_id) {
        index = i;
        this.valorTotalVenda = this.valorTotalVenda - p.preco * p.quantidade;
      }
    }
    this.itensDaVenda.splice(index, 1);

    this.formNovaVenda.value.valor_desconto = 0;
  }

  travaDesconto(event: KeyboardEvent) {
    let maxDesc = Math.floor(
      (this.valorTotalVenda * this.maxDescontoPorcentagem) / 100
    );

    if (
      event.key !== 'Backspace' &&
      this.formNovaVenda.value.valor_desconto &&
      this.formNovaVenda.value.valor_desconto > maxDesc
    ) {
      this.formNovaVenda.value.valor_desconto = maxDesc;
      event.preventDefault();
    }
  }

  fecharVenda() {
    if (this.formNovaVenda.valid) {
      this.formNovaVenda.value.valor = this.valorTotalVenda;
      this.formNovaVenda.value.valor_desconto = Number(
        this.formNovaVenda.value.valor_desconto
      );

      let itensToAdd = this.itensDaVenda.map((i: any) => ({
        produto_id: i.produto_id,
        quantidade: i.quantidade,
        valor: Number(i.preco),
      }));

      this.vendaService
        .create({ ...this.formNovaVenda.value, produtos: itensToAdd })
        .subscribe({
          next: () => {
            this.modalVendaVisible = false;
            this.formNovaVenda.reset();
            this.itensDaVenda = [];
            this.valorTotalVenda = 0;
            this.toastr.success('Venda realizada com sucesso!');
          },
          error: (err) => {
            this.toastr.error(
              err.error.message || 'Erro ao tentar fechar a venda.'
            );
          },
        });
    } else {
      console.log(this.formNovaVenda.controls);
      Object.values(this.formNovaVenda.controls).forEach((c) => {
        if (c.invalid) {
          c.markAsDirty();
          c.updateValueAndValidity({ onlySelf: true });
        }
      });

      if (!this.itensDaVenda.length) {
        this.toastr.error('Selecione pelo menos um item para a venda.');
      }
    }
  }
}
