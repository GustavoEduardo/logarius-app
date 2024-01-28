import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/estoque' },
  { path: 'estoque', loadComponent: () => import('./pages/estoque/index/index.component') },
  { path: 'estoque/itens', loadComponent: () => import('./pages/estoque/itens/itens.component') },
];
