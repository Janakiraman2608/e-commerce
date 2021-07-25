import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  isSubmitted = false;
  currentId!: string;
  constructor(
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });
    this.checkMode();
  }
  get categoryForm() {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  updateCategory() {
    const category: Category = {
      id: this.currentId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };
    this.categoryService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${category.name} is updated`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigate(['categories']);
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Category not updated',
        });
      }
    );
  }
  onCancel()
  {
    this.router.navigate(['categories']);
  }
  addCategory() {
    const category: Category = {
      id: '',
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };
    this.categoryService.createCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category created',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigate(['categories']);
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Category not created',
        });
      }
    );
  }

  checkMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentId = params.id;
        this.categoryService.getCategory(this.currentId).subscribe((res) => {
          this.categoryForm.name.setValue(res.name);
          this.categoryForm.icon.setValue(res.icon);
          this.categoryForm.color.setValue(res.color);
        });
      }
    });
  }
}
