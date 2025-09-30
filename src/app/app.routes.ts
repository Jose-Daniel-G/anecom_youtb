import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [{
  path: '',
  loadComponent: () =>
    import('./home/home.component').then((m) => m.HomeComponent),
},
{
  path: 'user-auth',
  loadComponent: () =>
    import('./user-auth/user-auth.component').then((m) => m.UserAuthComponent), //Login y Registro
},
{
  path: 'seller-auth',
  loadComponent: () =>
    import('./seller-auth/seller-auth.component').then((m) => m.SellerAuthComponent), //Login y Registro del vendedor
},
{
  path: 'seller-home',
  loadComponent: () =>
    import('./seller-home/seller-home.component').then((m) => m.SellerHomeComponent), //Dashboard del vendedor
  canActivate: [AuthGuard],
},
{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: '**', redirectTo: '' }
];
