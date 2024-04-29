import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/estabelecimento/comandas' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'estabelecimento/comandas',
    loadComponent: () => import('./pages/comandas/comandas.component'),
  },
  {
    path: 'estoque/itens',
    loadComponent: () => import('./pages/estoque/itens/itens.component'),
  },
];
