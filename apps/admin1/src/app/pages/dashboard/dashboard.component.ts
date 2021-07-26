import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  orders?: number;
  products?: number;
  users?: number;
  sales?: number;

  apiUrlUser = environment.apiURL + 'user/get/count';
  apiUrlProduct = environment.apiURL + 'product/get/count';
  apiUrlOrder = environment.apiURL + 'order/get/count';
  apiUrlSales = environment.apiURL + 'order/get/totalsales';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrders()
    this.getProducts()
    this.getUsers()
    this.getSales()
  }

  getUsers() {
    this.http.get<{ userCount: number }>(this.apiUrlUser).subscribe((res) => {
      this.users = res.userCount;
    });
  }

  getProducts() {
    this.http.get<{ productCount: number }>(this.apiUrlProduct).subscribe((res) => {
      this.products = res.productCount;
    });
  }

  getOrders() {
    this.http.get<{ orderCount: number }>(this.apiUrlOrder).subscribe((res) => {
      this.orders = res.orderCount;
    });
  }
  getSales() {
    this.http.get<{ totalSales: number }>(this.apiUrlSales).subscribe((res) => {
      this.sales = res.totalSales;
    });
  }
}
