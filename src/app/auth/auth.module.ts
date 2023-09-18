import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { HttpClientModule } from '@angular/common/http';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from '../material.module';


import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    MaterialModule
  ]
})
export class AuthModule { }
