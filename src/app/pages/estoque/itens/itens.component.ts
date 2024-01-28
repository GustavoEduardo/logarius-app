import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export default class ItensComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
