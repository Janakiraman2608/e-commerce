import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice = 0;
  isCheckout = false
  endSub$: Subject<any> = new Subject()
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.route.url.includes('checkout') ? this.isCheckout = true : this.isCheckout = false
    this._getTotalPrice();
  }

  ngOnDestroy(): void {
      this.endSub$.next()
      this.endSub$.complete()
  }


  private _getTotalPrice() {
    this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe((cart) => {
      this.totalPrice = 0;
      cart.items.forEach((item) => {
        this.orderService.getProduct(item.productId).pipe(take(1)).subscribe((product) => {
          this.totalPrice += product.price * item.quantity;
          console.log(this.totalPrice)
        });
      });
    });
  }
}
