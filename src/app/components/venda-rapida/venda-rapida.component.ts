import { Component, inject } from '@angular/core';
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
@Component({
  selector: 'app-venda-rapida',
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

  ],
  templateUrl: './venda-rapida.component.html',
  styleUrl: './venda-rapida.component.scss'
})
export class VendaRapidaComponent {

   // add em Helpers
   autoTips: Record<string, Record<string, string>> = {
    default: {
      required: 'Campo obrigatório',
    },
  };

  fb = inject(FormBuilder);

  modalVendaRapidaVisible = false; // alterar por ref

  formVendaRapida = this.fb.group({
    titulo: [null, Validators.required],
    observacao: [null],
  });

  showModalVendaRapida(){

  }

}
