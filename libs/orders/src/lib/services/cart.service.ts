import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor(private messageService: MessageService) {}
  initCartLS() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const initialCart = {
        items: [],
      };
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }
  }

  getCart(): Cart {
    const cartJson: any = localStorage.getItem('cart');
    const cart: Cart = JSON.parse(cartJson);

    return cart;
  }

  setCartItem(cartItem: CartItem, update?: boolean): Cart {
    const cart = this.getCart();
    const itemExist = cart.items.find(
      (item) => item.productId === cartItem.productId
    );
    if (itemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          if (update) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity += 1;
          }
        }
      });
    } else {
      cart.items.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cart updated',
    });
    return cart;
  }

  emptyCart(){
    const cart ={
      items: []
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCartItems = cart.items.filter(
      (item) => item.productId !== productId
    );
    cart.items = newCartItems;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cart updated',
    });
  }
}
