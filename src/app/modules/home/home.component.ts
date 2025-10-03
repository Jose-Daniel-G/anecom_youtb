import { Component, OnInit } from '@angular/core';
import { product } from '../../data-type';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule, NgbCarouselModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
 popularProducts:undefined|product[];
 trendyProducts:undefined | product[];
  constructor(private product:ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }
}
