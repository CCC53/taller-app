import { Pipe, PipeTransform } from '@angular/core';
import { ValidRoles } from '../types/auth';

@Pipe({
  name: 'employeeRole'
})
export class EmployeeRolePipe implements PipeTransform {

  transform(role: ValidRoles): string {
    return role == ValidRoles.ADMIN ? 'Administrador' : 'Mecanico';
  }

}
