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
@Component({
  selector: 'app-modal-venda',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NzModalModule,
    NzInputNumberModule,
    NzListModule

  ],
  templateUrl: './modal-venda.component.html',
  styleUrl: './modal-venda.component.scss'
})
export class ModalVendaComponent extends Helpers {

  fb = inject(FormBuilder);

  @Output() showModal = new EventEmitter<boolean>()

  modalVendaVisible = false;

  clientes: any = [];
  metodos_pagamento: any = [];

  formNovaVenda = this.fb.group({
    cliente_id: [null, Validators.required],
    metodo_pagamento_id: [null, Validators.required],
    valor: [null, Validators.required],
    valor_desconto: [null, Validators.required],
    produtos: [[], Validators.required],
  });

  // ver se precisa de tudo...

  produtos: any = [];

  itensParaAdicionar: any = [];

  valorParaPagar = 0;

  produtoIdParaAdicionar: any = null;
  qtdParaAdicionar = 1;
  valorTotalParaAdd = 0;

  ngOnInit() {

    this.produtos = [
      {
        produto_id: '1',
        nome: 'Produto 1',
        valor: 10.0,
        descricao: 'Breve descrição ddo item para facilitar a identificação',
      },
      {
        produto_id: '2',
        nome: 'Produto 2',
        valor: 10.0,
        descricao: 'Breve descrição ddo item para facilitar a identificação',
      },
      {
        produto_id: '3',
        nome: 'Produto 3',
        valor: 10.0,
        descricao: 'Breve descrição ddo item para facilitar a identificação',
      },
      {
        produto_id: '4',
        nome: 'Produto 4',
        valor: 10.0,
        descricao: 'Breve descrição ddo item para facilitar a identificação',
      },
      {
        produto_id: '5',
        nome: 'Produto 5',
        valor: 10.0,
        descricao: 'Breve descrição ddo item para facilitar a identificação',
      },
    ];
  }

  showModalNovaVenda(){

    this.modalVendaVisible = !this.modalVendaVisible;

  }

  adicionarItem() {
    let existe = false;

    const p = this.produtos.find(
      (p: any) => p.produto_id === this.produtoIdParaAdicionar
    );

    this.itensParaAdicionar.forEach( (item: any) => {
      if (item.produto_id === this.produtoIdParaAdicionar){
        item.quantidade += this.qtdParaAdicionar;
        existe = true;
      }
    });

    if (!existe){
      this.itensParaAdicionar.push({
        produto_id: this.produtoIdParaAdicionar,
        quantidade: this.qtdParaAdicionar,
        ...p,
      });
    }

    this.valorTotalParaAdd += p.valor * this.qtdParaAdicionar;

    this.produtoIdParaAdicionar = null;
    this.qtdParaAdicionar = 1;
  }

  removerItem(produto_id: string) {
    let index = 0;

    for (let [i, p] of this.itensParaAdicionar.entries()) {
      if (p.produto_id === produto_id) {
        index = i;
        this.valorTotalParaAdd = this.valorTotalParaAdd - p.valor * p.quantidade;
      }
    }
    this.itensParaAdicionar.splice(index, 1);
  }

}
