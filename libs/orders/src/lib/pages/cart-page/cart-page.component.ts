import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem, CartItemDetails } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartDetails: CartItemDetails[] = [];
   endSub$!: Subscription
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}


  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(): void {
    this.endSub$.unsubscribe()
  }

  private _getCartDetails() {
   this.endSub$= this.cartService.cart$.subscribe((cart) => {
      this.cartDetails = [];
      cart.items?.forEach((cartItem) => {
        this.orderService
          .getProduct(cartItem.productId)
          .subscribe((resProd) => {
            this.cartDetails.push({
              product: resProd,
              quantity: cartItem.quantity,
            });
          });
      });
    });
  }

  backTo() {
    this.router.navigate(['/products']);
  }
  onDeleteItem(productId: string) {
    this.cartService.deleteCartItem(productId)
  }

  updateQuantity(event:any, updCartItem: CartItemDetails)
  {
    const cartItem: CartItem = {
      productId: updCartItem.product.id,
      quantity: event.value
    }

    this.cartService.setCartItem(cartItem, true)
  }
}


