import { Component, OnInit, inject } from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProdutoService } from '../../../services/produto.service';
import { ToastrService } from 'ngx-toastr';
import { IProduto } from '../../../types/IProduto';
import { CurrencyPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Helpers } from '../../../shared/helpers';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    CurrencyPipe,
    NzBadgeModule,
    NzToolTipModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export default class ItensComponent extends Helpers implements OnInit {
  pagination: any = {
    perPage: 50,
    currentPage: 1,
    last_page: 1,
    total: 50,
    from: 1,
    to: 1,
  };

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

  modalAddVisible = false;
  produtos: IProduto | any;


  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ){
    super()
  }

  formFiltrar = this.fb.group({
    precoDe: [null],
    precoAte: [null],
    estoqueDe: [null],
    estoqueAte: [null],
    pesquisa: [null],
  });

  formCadastrar = this.fb.group({
    nome: [null, Validators.required],
    descricao: [null],
    quantidade_estoque: [null, Validators.required],
    preco: [null, Validators.required],
    preco_custo: [null, Validators.required],
    categoria_id: [null, Validators.required],
    marca_id: [null, Validators.required],
    fornecedor_id: [null, Validators.required],
  });

  timeSearchId: any = null;

  categorias: any = [{categoria_id: 'c8579a1a-5d73-4ba6-8cd7-48a04bb49496', descricao: 'Indefinido'}];
  fornecedores: any = [{fornecedor_id: '3e6ba4ee-450b-45f8-a6bd-622c0894546e', descricao: 'Indefinido'}];
  marcas: any = [{marca_id: '47eb4cf8-12e9-4999-89e6-4ed3adbb59d9', descricao: 'Indefinido'}];

  loadingBt = false;

  ngOnInit() {
    this.listar();
  }

  listar() {
    const f = this.filtrar(this.formFiltrar, this.params, this.pagination);

    this.qtdFiltrosAtivos = f.qtdFiltrosAtivos;

    this.produtoService.get(f.queryString).subscribe({
      next: (res) => {
        this.produtos = res.result.data;

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
        this.toastr.error(err.error?.message || 'Erro ao listar produtos.');
      },
    });
  }

  buscar() {
    window.clearTimeout(this.timeSearchId);

    this.timeSearchId = setTimeout(() => {
      this.pagination.currentPage = 1;
      this.listar();
    }, 900);
  }

  listByTable(params: NzTableQueryParams) {
    let buscar = false;

    if (params.pageIndex === this.pagination.currentPage) {
      params.sort.forEach((s) => {
        if (s.value) {
          buscar = true;
        }
      });
    }

    if (
      buscar ||
      (params.pageIndex === 1 && this.pagination.currentPage > 1) ||
      (params.pageIndex > 1 && params.pageIndex !== this.pagination.currentPage)
    ) {
      this.params = params;
      this.pagination.currentPage = params.pageIndex;
      this.listar();
    }
  }

  showModalAdicionar() {
    this.modalAddVisible = !this.modalAddVisible;
  }

  showModalFiltrar() {
    this.modalFiltrarVisible = !this.modalFiltrarVisible;
  }

  resetSearch() {
    this.params = {
      pageIndex: 1,
      pageSize: 50,
      sort: [],
      filter: [],
    };

    this.pagination.currentPage = 1;

    this.formFiltrar.reset();

    this.listar();
  }

  expandEvent() {
    this.expand = !this.expand;
  }

  filtrar(
    form?: FormGroup,
    params?: NzTableQueryParams,
    pagination?: any
  ): { qtdFiltrosAtivos: number; queryString: string } {
    this.params.pageIndex = 1;
    let qtdFiltrosAtivos = 0;
    let queryString = '';

    for (let [key, value] of Object.entries(form?.value)) {
      if (value) {
        qtdFiltrosAtivos =
          key !== 'pesquisa' ? qtdFiltrosAtivos + 1 : qtdFiltrosAtivos;

        if (value) {
          queryString += `&${key}=${value}`;
        }
      }
    }

    if (params)
      // adiciona ordem
      for (let s of params.sort) {
        if (s.value) {
          queryString += `&ordem=${s.key}&tipo_ordem=${s.value}`;
        }
      }

    if (pagination)
      if (pagination.currentPage) {
        // adiciona páginação
        queryString += `&currentPage=${this.pagination.currentPage}`;
      }

    if (pagination.perPage) {
      queryString += `&perPage=${this.pagination.perPage}`;
    }

    queryString = queryString.replace('&', '?');

    return { qtdFiltrosAtivos, queryString };
  }

  cadastrar() {

    if (this.formCadastrar.valid){
        this.loadingBt = true;

        this.produtoService.create(this.formCadastrar.value).subscribe({
          next: (res)=>{
            this.loadingBt = false;
            this.showModalAdicionar();
            this.formCadastrar.reset();
            this.listar();
            this.toastr.success(res.result.message || 'Produto cadastrado com sucesso');
          },
          error: (err)=>{
            this.loadingBt = false;
            this.toastr.error(err.error?.message || 'Falha ao cadastrar produto');
          }
        })


    }else {
      Object.values(this.formCadastrar.controls).forEach((c) => {
        if (c.invalid) {
          c.markAsDirty();
          c.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
