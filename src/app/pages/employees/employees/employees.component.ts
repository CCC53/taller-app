import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTableOptions } from 'src/app/types/shared';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  options: DynamicTableOptions = {
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Puesto', pipe: 'employeeRole' }
    ],
    table: 'employees',
    searchLabel: 'Buscar por nombre',
    showIcon: true,
    allowSearch: true,
    allowedDelete: true,
    allowedEdit: true,
    allowPagination: true,
  }

  constructor(private router: Router, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.alertsService.showLoading();
  }

  newEmployee() {
    this.router.navigateByUrl("/dashboard/employees/nuevo");
  }
}
