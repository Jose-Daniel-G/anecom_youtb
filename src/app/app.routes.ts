import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [{
      path: '',
      loadComponent: () =>
        import('./modules/home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: 'user-auth',
      loadComponent: () =>
        import('./auth/user-auth.component').then((m) => m.UserAuthComponent), //Login y Registro
    },
    {
      path: 'seller-auth',
      loadComponent: () =>
        import('./modules/seller/seller-auth/seller-auth.component').then((m) => m.SellerAuthComponent), //Login y Registro del vendedor
    },
    {
      path: 'seller-home',
      loadComponent: () =>
        import('./modules/seller/seller-home/seller-home.component').then((m) => m.SellerHomeComponent), //Dashboard del vendedor
      canActivate: [AuthGuard],
    },
    {
      path: 'create', //create
      loadComponent: () =>
        import('./modules/products/create/seller-add-product.component').then((m) => m.SellerAddProductComponent),
      canActivate: [AuthGuard],
    },
    {
      path: 'edit', //edit
      loadComponent: () =>
        import('./modules/products/edit/seller-update-product.component').then((m) => m.SellerUpdateProductComponent),
      canActivate: [AuthGuard],
    },
    {
      path: 'my-orders',
      loadComponent: () =>
        import('./modules/my-orders/my-orders.component').then((m) => m.MyOrdersComponent),
    },
    {
      path: 'checkout',
      loadComponent: () =>
        import('./modules/cart/checkout/checkout.component').then((m) => m.CheckoutComponent),
    },
    {
      path: 'cart-page',
      loadComponent: () =>
        import('./modules/cart/cart-page/cart-page.component').then((m) => m.CartPageComponent),
    },
    {
      path: 'seller-update-product/:id',
      loadComponent: () =>
        import('./modules/products/edit/seller-update-product.component').then((m) => m.SellerUpdateProductComponent),
    },
    {
      path: 'search/:query',
      loadComponent: () =>
        import('./search/search.component').then((m) => m.SearchComponent),
    },
    {
      path: 'details/:productId',
      loadComponent: () =>
        import('./modules/products/show/product-details.component').then((m) => m.ProductDetailsComponent),
    },
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
