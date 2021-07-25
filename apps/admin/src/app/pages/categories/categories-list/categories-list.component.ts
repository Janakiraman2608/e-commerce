import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-categories',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategorylist();
  }
  getCategorylist() {
    this.categoryService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  updateCategory(categoerId: string) {
    this.router.navigate(['form/', categoerId], {relativeTo: this.route});
  }

  deleteCategory(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(productId).subscribe(
          () => {
            this.getCategorylist();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Category is deleted`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Category not deleted',
            });
          }
        );
      },
    });
  }
}
