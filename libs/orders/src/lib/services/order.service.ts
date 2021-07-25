import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@env/environment'
import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrlOrder = environment.apiURL+'order/'
  apiUrlProduct = environment.apiURL+'product/'
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrlOrder);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlOrder}${orderId}`);
  }

  createOrder(order: Order) {
    return this.http.post(this.apiUrlOrder, order);
  }

  updateOrder(orderStatus: {status: string}, orderId: string) {
    console.log(orderStatus)
    return this.http.put(`${this.apiUrlOrder}${orderId}`, orderStatus);
  }
  deleteOrder(orderId: string) {
    return this.http.delete(
      `${this.apiUrlOrder}${orderId}`
    );
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProduct}${productId}`);
  }
}
