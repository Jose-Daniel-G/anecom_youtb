import { Component, Input, OnInit } from '@angular/core';
import { product } from '../data-type'; 
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html' 
})
export class CarouselComponent implements OnInit {
  @Input() products: product[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
