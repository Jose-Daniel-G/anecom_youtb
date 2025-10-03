import { Component, OnInit } from '@angular/core';
import { product } from '../../../data-type';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone:true,
  imports:[CommonModule, FormsModule],
  templateUrl: './seller-add-product.component.html',
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}

  ngOnInit(): void {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
}
