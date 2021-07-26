import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from '@e-commerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);
    });
  }

  updateProduct(productId: string) {
    this.router.navigate(['form/', productId], { relativeTo: this.route });
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts()
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Product is deleted`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Product not deleted',
            });
          }
        );
      },
    });
  }
}
