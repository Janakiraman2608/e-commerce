import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalSService } from '../../services/localS.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authResponse = 'Email or Password is not correct';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorage: LocalSService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;

    this.auth
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe(
        (user) => {
          this.authResponse = '';
          this.localStorage.setToken(user.token);
           this.router.navigate([''])

        },
        (error) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authResponse = 'Server down..try later';
          }
        }
      );
  }
}
