import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@e-commerce/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../status.constants';



@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus: any = ORDER_STATUS;

  constructor(private messageService: MessageService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this._getOrders();
  }
  private _getOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      orders.map(order=>
        {
          this.orderStatus[order.status]
        })
    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }
  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe(()=>
    {
      this._getOrders()
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order deleted',
      })
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Order not deleted',
      });
    })

  }
}
