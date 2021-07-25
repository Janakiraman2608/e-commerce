import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@e-commerce/users';
import { UserService } from '@e-commerce/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countryLib from 'i18n-iso-countries'

declare const require: any

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})


export class UserFormComponent implements OnInit {

  form!: FormGroup;
  editMode = false;
  isSubmitted = false;
  currentId!: string
  isAdmin = false
  countries: any
  constructor(
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: ['isAdmin'],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
    this.checkMode();
    this.getCountries()
  }

  getCountries(){
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countryLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countryLib.getNames("en", {select: "official"})).map(entry=>
      {
        return {
          id: entry[0],
          name: entry[1]
        }
      })
  }

  get userForm() {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() {
    const user: User = {
      id: this.currentId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    };
    this.userService.updateUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${user.name} is updated`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigate(['users']);
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'User not updated',
        });
      }
    );
  }
  onCancel()
  {
    this.router.navigate(['users']);
  }
  addUser() {
    const user: User = {
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    };
    this.userService.createUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User created',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigate(['users']);
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'User not created',
        });
      }
    );
  }

  checkMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentId = params.id;
        this.userService.getUser(this.currentId).subscribe((res: User) => {
          this.userForm.name.setValue(res.name)
          this.userForm.email.setValue(res.email)
          this.userForm.phone.setValue(res.phone)
          this.userForm.isAdmin.setValue(res.isAdmin)
          this.userForm.street.setValue(res.street)
          this.userForm.apartment.setValue(res.apartment)
          this.userForm.zip.setValue(res.zip)
          this.userForm.city.setValue(res.city)
          this.userForm.country.setValue(res.country)
          this.userForm.password.setValidators([])
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

}
