import { Component, OnInit, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
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
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IComanda } from '../../types/IComanda';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Helpers } from '../../shared/helpers';

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
    NzIconModule
  ],
  templateUrl: './comandas.component.html',
  styleUrl: './comandas.component.scss',
})
export default class ComandasComponent extends Helpers implements OnInit {
  modalAddVisible = false;
  modalDetalhesVisible = false;
  modalPagarVisible = false;
  modalAddItemVisible = false;

  fb = inject(FormBuilder);

  comandaSelecionada: IComanda | null = null;

  formAdicionar = this.fb.group({
    titulo: [null, Validators.required],
    observacao: [null],
  });

  comandas: IComanda[] = [];

  produtos: any = [];

  itensParaAdicionar: any = [];

  valorParaPagar = 0;

  produtoIdParaAdicionar: any = null;
  qtdParaAdicionar = 1;
  valorTotalParaAdd = 0;

  ngOnInit() {
    this.comandas = [
      {
        comanda_id: '1',
        titulo: 'Gustavo Primo',
        observacao: 'Está com 5 pessoas',
        valorTotal: 62.0,
        valorPago: 0,
        itens: [
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'long Neck Stela 600ml ', valor: 7.0 },
          { nome: 'Narguilé', valor: 20.0 },
          { nome: 'Essencia maracujá marca', valor: 5.0 },
        ],
        status: 'aberta',
      },
      {
        comanda_id: '2',
        titulo: 'Gustavo Primo',
        observacao: 'Está com 5 pessoas',
        valorTotal: 62.0,
        valorPago: 0,
        itens: [
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'long Neck Stela 600ml ', valor: 7.0 },
          { nome: 'Narguilé', valor: 20.0 },
          { nome: 'Essencia maracujá marca', valor: 5.0 },
        ],
        status: 'aberta',
      },
      {
        comanda_id: '3',
        titulo: 'Gustavo Primo',
        observacao: 'Está com 5 pessoas',
        valorTotal: 62.0,
        valorPago: 0,
        itens: [
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'long Neck Stela 600ml ', valor: 7.0 },
          { nome: 'Narguilé', valor: 20.0 },
          { nome: 'Essencia maracujá marca', valor: 5.0 },
        ],
        status: 'aberta',
      },
      {
        comanda_id: '4',
        titulo: 'Gustavo Primo',
        observacao: 'Está com 5 pessoas',
        valorTotal: 62.0,
        valorPago: 0,
        itens: [
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'long Neck Stela 600ml ', valor: 7.0 },
          { nome: 'Narguilé', valor: 20.0 },
          { nome: 'Essencia maracujá marca', valor: 5.0 },
        ],
        status: 'aberta',
      },
      {
        comanda_id: '5',
        titulo: 'Gustavo Primo',
        observacao: 'Está com 5 pessoas',
        valorTotal: 62.0,
        valorPago: 0,
        itens: [
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'long Neck Stela 600ml ', valor: 7.0 },
          { nome: 'Narguilé', valor: 20.0 },
          { nome: 'Essencia maracujá marca', valor: 5.0 },
        ],
        status: 'aberta',
      },
      {
        comanda_id: '6',
        titulo: 'Gustavo Primo',
        observacao: 'Está com 5 pessoas',
        valorTotal: 62.0,
        valorPago: 0,
        itens: [
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'long Neck Stela 600ml ', valor: 7.0 },
          { nome: 'Narguilé', valor: 20.0 },
          { nome: 'Essencia maracujá marca', valor: 5.0 },
        ],
        status: 'aberta',
      },
      {
        comanda_id: '7',
        titulo: 'Gustavo Primo',
        observacao: 'Está com 5 pessoas',
        valorTotal: 62.0,
        valorPago: 0,
        itens: [
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'Dose de gin p', valor: 25.0 },
          { nome: 'long Neck Stela 600ml ', valor: 7.0 },
          { nome: 'Narguilé', valor: 20.0 },
          { nome: 'Essencia maracujá marca', valor: 5.0 },
        ],
        status: 'aberta',
      },
    ];

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

  showModalAdicionar() {
    this.modalAddVisible = !this.modalAddVisible;

    if (!this.modalAddVisible) {
      this.formAdicionar.reset();
    }
  }

  adicinarComanda() {
    if (this.formAdicionar.valid) {

    } else {
      Object.values(this.formAdicionar.controls).forEach(control => {
        if (control.invalid) {
          console.log(control)
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
    this.comandaSelecionada = c;
    this.modalPagarVisible = !this.modalPagarVisible;
  }

  pagarComanda(idComanda: string, fechar: boolean = false) {
    // service de pagar/fechar comanda

    this.showModalPagar();
  }

  showModalAddItem(c: IComanda | null = null) {
    this.comandaSelecionada = c;
    this.modalAddItemVisible = !this.modalAddItemVisible;

    if (!this.modalAddItemVisible) {
      this.produtoIdParaAdicionar = null;
      this.qtdParaAdicionar = 1;
      this.itensParaAdicionar = [];
      this.valorTotalParaAdd = 0;
    }
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


// remover item da comanda
// cancelar comanda (cancela venda)
// criar tipo IProduto
// validar formulários
// mascara valor para pagar
