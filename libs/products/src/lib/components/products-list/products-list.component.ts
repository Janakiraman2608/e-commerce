import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  checked = false;
  isCatPage = false
  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryId
        ? this._getProducts([params.categoryId])
        : this._getProducts();

        params.categoryId ? this.isCatPage = true : this.isCatPage = false
    });

    this._getCategories();
  }

  private _getProducts(selCats?: any) {
    this.prodService.getProducts(selCats).subscribe((res) => {
      this.products = res;
    });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  onCatFilter() {
    const selectedCat = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    this._getProducts(selectedCat);
  }
}
