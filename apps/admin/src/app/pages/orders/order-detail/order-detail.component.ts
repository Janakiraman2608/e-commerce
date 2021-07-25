
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '@e-commerce/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ORDER_STATUS } from '../status.constants';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [],
})
export class OrderDetailComponent implements OnInit {
  order!: Order;
  status: any;

    selectedStatus!: string;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getOrderStatus();
    this._getOrder();
  }
  private _getOrderStatus() {
    this.status = Object.entries(ORDER_STATUS).map((entry) =>
      {
        return{
          id: entry[0],
          name: entry[1].label
        }
      })
  }
  onStatusSel(event: any){
    console.log(event.value)
     this.orderService.updateOrder({status:event.value}, this.order.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order updated',
      });
      timer(2000)
        .toPromise()
        .then(() => {
          this.router.navigate(['orders']);
        });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Order not updated',
      });
    })
  }
  private _getOrder() {
    this.route.params.subscribe((params) => {
      this.orderService.getOrder(params.id).subscribe((order) => {
        this.order = order;
        this.selectedStatus = order.status
      });
    });
  }
}
