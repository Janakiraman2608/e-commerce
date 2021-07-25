import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';

import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankyouPageComponent } from './pages/thankyou-page/thankyou-page.component';
const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'success',
    component: ThankyouPageComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    FormsModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
  ],
  providers: [],
  declarations: [ CartPageComponent, OrderSummaryComponent, CartIconComponent, CheckoutPageComponent, ThankyouPageComponent],
  exports: [ CartPageComponent, OrderSummaryComponent, CartIconComponent, CheckoutPageComponent, ThankyouPageComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLS();
  }
}
