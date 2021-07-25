/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Component, Input, OnInit } from '@angular/core';

import { CartItem, CartService } from '@e-commerce/orders';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartService: CartService){}
  ngOnInit(): void {

  }

  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)

  }
}
