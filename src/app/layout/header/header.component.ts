import { Component, OnInit, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { product } from '../../data-type';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  // Convertimos todas las propiedades de estado a Signals
  public menuType =     signal<'default' | 'user' | 'seller'>('default');
  public sellerName =   signal<string>("");
  public userName =     signal<string>("");
  public searchResult = signal<product[] | undefined>(undefined);
  public cartItems =    signal<number>(0);  
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName.set(sellerData.name);
          this.menuType.set('seller');
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName.set(userData.name);
          this.menuType.set('user');
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType.set('default');
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems.set(JSON.parse(cartData).length);
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems.set(items.length);
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);; // Usa el EventEmitter del servicio
  }

  searchProduct(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    const searchTerm = element.value;
    if (searchTerm) {

      this.product.searchProduct(element.value).subscribe((result) => {

        if (result.length > 5) {
          result.length = length
        }
        this.searchResult.set(result);;
      })
    } else {
      this.searchResult.set(undefined);
    }
  }
  hideSearch() {
    // Usamos setTimeout para dar tiempo al mousedown/click en las sugerencias
    setTimeout(() => {
      this.searchResult.set(undefined);
    }, 200);
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id])
  }
  submitSearch(val: string) {
    console.warn(val)
    this.route.navigate([`search/${val}`]);
    this.searchResult.set(undefined); // Ocultar sugerencias al enviar
  }
}
