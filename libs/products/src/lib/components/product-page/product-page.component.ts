import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@e-commerce/orders';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  quantity = 1;
  constructor(
    private prodService: ProductsService,
    private routr: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.routr.params.subscribe((params) => {
      this.prodService.getProduct(params.productId).subscribe((prod) => {
        this.product = prod;
      });
    });
  }

  onAddtocart() {
    const cartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };
    this.cartService.setCartItem(cartItem);
  }

  onBuynow() {}
}
