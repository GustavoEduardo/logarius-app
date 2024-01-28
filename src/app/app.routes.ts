import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/estoque/gerenciar-estoque/welcome.routes').then(m => m.WELCOME_ROUTES) }
];
