import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form!: FormGroup;
  categories: Category[] = [];
  prodImage!: any;
  currentId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private categorySevices: CategoriesService,
    private productServices: ProductsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this.checkMode();
  }

  checkMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentId = params.id;
        this.productServices.getProduct(this.currentId).subscribe((res: Product) => {
          this.productForm.name.setValue(res.name);
          this.productForm.brand.setValue(res.brand);
          this.productForm.price.setValue(res.price);
          this.productForm.countInStock.setValue(res.countInStock);
          this.productForm.category.setValue(res.category?.id);
          this.productForm.isFeatured.setValue(res.isFeatured);
          this.productForm.description.setValue(res.description);
          this.productForm.richDescription.setValue(res.richDescription);
          this.prodImage = res.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }

  private _getCategories() {
    this.categorySevices.getCategories().subscribe((response: Category[]) => {
      this.categories = response;
    });
  }
  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.get('image')?.patchValue(file);
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.prodImage = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: ['false'],
    });
  }

  get productForm() {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if(this.editMode){
       this._updateProduct(productFormData)
    }else{
      this._addProduct(productFormData);
    }
  }

  private _updateProduct(productFormData: FormData) {
    this.productServices.updateProduct(productFormData, this.currentId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product updated',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigate(['products']);
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Product not updated',
        });
      }
    );
  }

  private _addProduct(productFormData: FormData) {
    this.productServices.createProduct(productFormData).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product created',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigate(['products']);
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Product not created',
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(["products"])
  }
}
