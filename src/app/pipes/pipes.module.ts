import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRolePipe } from './employee-role.pipe';
import { SparePartTypePipe } from './spare-part-type.pipe';
import { VehicleTypePipe } from './vehicle-type.pipe';



@NgModule({
  declarations: [
    EmployeeRolePipe,
    SparePartTypePipe,
    VehicleTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmployeeRolePipe,
    SparePartTypePipe,
    VehicleTypePipe
  ]
})
export class PipesModule { }
