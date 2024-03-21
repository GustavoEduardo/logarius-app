import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/estoque' },
  {
    path: 'comandas',
    loadComponent: () => import('./pages/comandas/comandas.component'),
  },
  {
    path: 'estoque/itens',
    loadComponent: () => import('./pages/estoque/itens/itens.component'),
  },
];
