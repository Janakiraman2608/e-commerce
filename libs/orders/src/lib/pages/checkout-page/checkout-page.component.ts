import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as countryLib from 'i18n-iso-countries';
import { Cart } from '../../models/cart.model';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

declare const require: any;
@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  form!: FormGroup;
  countries: any;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '5f168810be2e99a158c08505';
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.getCountries();
    this.getOrderItems();
  }

  getCountries() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countryLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countryLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  getOrderItems() {
    const cart: Cart = this.cartService.getCart()
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
    console.log(this.orderItems)
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: '0',
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.orderService.createOrder(order).subscribe(() => {
      this.cartService.emptyCart()
      this.router.navigate(['/success'])
    });
  }

  get checkoutForm() {
    return this.form.controls;
  }
}
