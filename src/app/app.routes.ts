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
    {
      path: 'seller-add-product',
      loadComponent: () =>
        import('./seller-add-product/seller-add-product.component').then((m) => m.SellerAddProductComponent),
      canActivate: [AuthGuard],
    },
    {
      path: 'seller-update-product',
      loadComponent: () =>
        import('./seller-update-product/seller-update-product.component').then((m) => m.SellerUpdateProductComponent),
      canActivate: [AuthGuard],
    },
    {
      path: 'my-orders',
      loadComponent: () =>
        import('./my-orders/my-orders.component').then((m) => m.MyOrdersComponent),
    },
    {
      path: 'checkout',
      loadComponent: () =>
        import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
    },
    {
      path: 'cart-page',
      loadComponent: () =>
        import('./cart-page/cart-page.component').then((m) => m.CartPageComponent),
    },
    {
      path: 'seller-update-product/:id',
      loadComponent: () =>
        import('./seller-update-product/seller-update-product.component').then((m) => m.SellerUpdateProductComponent),
    },
    {
      path: 'search/:query',
      loadComponent: () =>
        import('./search/search.component').then((m) => m.SearchComponent),
    },
    {
      path: 'details/:productId',
      loadComponent: () =>
        import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent),
    },
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
