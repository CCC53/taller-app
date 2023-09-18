import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/types/employees';
import { DynamicTableData, DynamicTableOptions, PaginatorData } from 'src/app/types/shared';
import { AlertsService } from '../../../services/alerts.service';
import Swal from 'sweetalert2';

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
    showIcon: true,
    allowSearch: true,
    allowedDelete: true,
    allowedEdit: true,
    allowPagination: true,
  }
  data: DynamicTableData = {
    data: [],
    totalCount: 0
  };
  paginatorData: PaginatorData = {
    pageIndex: 0,
    pageSize: 5
  }
  loading: boolean = true;

  constructor(private router: Router, private alertsService: AlertsService,
    private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.alertsService.showLoading();
    this.loadEmployees(this.paginatorData.pageIndex, this.paginatorData.pageSize);
  }

  loadEmployees(page: number, pageSize: number) {
    this.employeesService.findAll(page, pageSize).subscribe(res => {
      this.data.data = res.employees;
      this.data.totalCount = res.totalCount;
      this.loading = false;
      this.alertsService.hideAlert();
    });
  }

  viewItem(item: Employee) {
    this.router.navigateByUrl(`/dashboard/employees/${item.id}`)
  }

  deleteItem(item: Employee) {
    Swal.fire({
      title: '¿Desea eliminar este registro?',
      text: "No podrá revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeesService.deleteOne(item.id).subscribe(res => {
          if (res.deleted) {
            this.data.data = this.data.data.filter(s => s.id != item.id);
          }
        })
      }
    })
  }

  newEmployee() {
    this.router.navigateByUrl("/dashboard/employees/nuevo");
  }

  handlePage(event: PaginatorData) {
    this.paginatorData = event;
    this.loadEmployees(this.paginatorData.pageIndex+1, this.paginatorData.pageSize);
  }

}
