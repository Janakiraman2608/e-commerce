import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UiModule } from '@e-commerce/ui';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

export const productsRoutes: Route[] = [
  { path: 'products', component: ProductsListComponent },
  { path: 'categories/:categoryId', component: ProductsListComponent },
  { path: 'products/:productId', component: ProductPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    ToastModule

  ],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  providers: [MessageService]
})
export class ProductsModule {}
