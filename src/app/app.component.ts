import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ModalVendaComponent } from './components/modal-venda/modal-venda.component';
import { Observable, filter } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    RouterModule,
    ModalVendaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  @ViewChild('modalVenda')
  modalVenda!: ModalVendaComponent

  constructor(
    private authService: AuthService,
    protected router: Router
  ) {}

  currentUser$ = this.authService.getCurrentUser();

  caminho: string[] = [];

  ngOnInit(): void {

    this.test();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.caminho = this.router.url.split('/');
      this.caminho.unshift();
    });

    if (this.authService.estaLogado()){
      this.authService.decodeJwt();
    }

  }

  test() {

    this.authService.testeAuth().subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  logout(){
    this.router.navigate(['/login']);
    this.authService.logout()
  }

}
