import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

export const usersRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersRoutes), ReactiveFormsModule, InputTextModule, ButtonModule],
  declarations: [LoginComponent],
})
export class UsersModule {}
