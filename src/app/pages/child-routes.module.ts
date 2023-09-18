import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeesComponent } from './employees/employees/employees.component';
import { ServiceComponent } from './services/service/service.component';
import { ServicesComponent } from './services/services/services.component';
import { SparePartComponent } from './spare-parts/spare-part/spare-part.component';
import { SparePartsComponent } from './spare-parts/spare-parts/spare-parts.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
import { VehiclesComponent } from './vehicles/vehicles/vehicles.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { path: 'employees', canActivate:[AdminGuard], component: EmployeesComponent },
  { path: 'employees/nuevo', canActivate:[AdminGuard], component: EmployeeComponent },
  { path: 'employees/:id', canActivate:[AdminGuard], component: EmployeeComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/nuevo', component: VehicleComponent },
  { path: 'vehicles/:id', component: VehicleComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/nuevo', component: ServiceComponent },
  { path: 'services/:id', component: ServiceComponent },
  { path: 'spare-parts', component: SparePartsComponent },
  { path: 'spare-parts/nuevo', component: SparePartComponent },
  { path: 'spare-parts/:id', component: SparePartComponent },
  { path: 'update-profile', component: UpdateProfileComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutesModule { }
