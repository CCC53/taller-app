import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// 
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
// 
import { EmployeesComponent } from './employees/employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
// 
import { ServicesComponent } from './services/services/services.component';
import { ServiceComponent } from './services/service/service.component';
// 
import { VehiclesComponent } from './vehicles/vehicles/vehicles.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
// 
import { SparePartsComponent } from './spare-parts/spare-parts/spare-parts.component';
import { SparePartComponent } from './spare-parts/spare-part/spare-part.component';
// 
import { PagesComponent } from './pages/pages.component';
// 
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    ServicesComponent,
    ServiceComponent,
    VehiclesComponent,
    VehicleComponent,
    SparePartsComponent,
    SparePartComponent,
    UpdateProfileComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    PagesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PagesModule { }
