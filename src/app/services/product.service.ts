import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
    private baseUrl = environment.URL_SERVICIOS; // Ejemplo: http://127.0.0.1:8000/api
    private products = `${this.baseUrl}/products`;
    private orders = `${this.baseUrl}/orders`;
    private cart = `${this.baseUrl}/cart`;
    
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post(`${this.products}`, data);
  }
  productList() {
    return this.http.get<product[]>(`${this.products}`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.products}/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.products}/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `${this.products}/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>(`${this.products}?_limit=3`);
  }

  trendyProducts() {
    return this.http.get<product[]>(`${this.products}?_limit=8`);
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(
      `${this.products}?q=${query}`
    );
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(`${this.cart}`, cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>(`${this.cart}?userId=`+ userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete(`${this.cart}/` + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`${this.cart}?userId=${userData.id}`);
  }

  orderNow(data: order) {
    return this.http.post(`${this.orders}`, data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`${this.orders}?userId=${userData.id}`);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.cart}/${cartId}`).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete(`${this.orders}/${orderId}`)
  }
}
