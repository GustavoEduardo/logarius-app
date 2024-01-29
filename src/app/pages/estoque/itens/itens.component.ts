import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';





@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [NzTableModule, NzCardModule, NzButtonModule, NzDrawerModule, NzFormModule, NzSelectModule, NzInputModule, NzIconModule],
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export default class ItensComponent implements OnInit {

  modalAddVisible = false;

  constructor() { }

  ngOnInit() { }

  showModalAdicionar(){

    this.modalAddVisible = !this.modalAddVisible;

  }

}
