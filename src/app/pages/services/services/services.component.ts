import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServicesService } from 'src/app/services/services.service';
import { ValidRoles } from 'src/app/types/auth';
import { Service } from 'src/app/types/services';
import { DynamicTableData, DynamicTableOptions, PaginatorData } from 'src/app/types/shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  options: DynamicTableOptions = {
    columns: [
      { key: "issue", label: 'Motivo' },
      { key: "startDate", label: 'Fecha de inicio', pipe: 'date' },
      { key: "endDate", label: 'Fecha de termino', pipe: 'date' }
    ],
    table: 'services',
    showIcon: true,
    allowSearch: true,
    allowedDelete: true,
    allowedEdit: true,
    allowPagination: true,
  }
  data: DynamicTableData = {
    data: [] as Service[],
    totalCount: 0
  };
  paginatorData: PaginatorData = {
    pageIndex: 0,
    pageSize: 5
  }
  loading: boolean = true;

  constructor(private router: Router, private serviceService: ServicesService,
    private authService: AuthService, private alertsService: AlertsService) {
  }

  ngOnInit(): void {
    this.alertsService.showLoading();
    this.loadServices(this.paginatorData.pageIndex, this.paginatorData.pageSize);
    this.authService.getMe().subscribe(({ me }) => {
      const { role } = me;
      if (role === ValidRoles.MECHANIC) {
        this.options.allowedDelete = false;
        this.options.allowedEdit = false;
      }
    });
  }

  loadServices(page: number, pageSize: number) {
    this.serviceService.findAll(page, pageSize).subscribe(res => {
      this.data.data = res.services;
      this.data.totalCount = res.totalCount;
      this.loading = false;
      this.alertsService.hideAlert();
    })
  }

  viewItem(item: Service) {
    this.router.navigateByUrl(`/dashboard/services/${item.id}`)
  }

  deleteItem(item: Service) {
    Swal.fire({
      title: '¿Desea eliminar este registro?',
      text: "No podrá revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.deleteOne(item.id).subscribe(res => {
          if (res.deleted) {
            this.data.data = this.data.data.filter(s => s.id != item.id);
          }
        })
      }
    })
  }

  newService() {
    this.router.navigateByUrl("/dashboard/services/nuevo");
  }

  handlePage(event: PaginatorData) {
    this.paginatorData = event;
    this.loadServices(this.paginatorData.pageIndex+1, this.paginatorData.pageSize);
  }

}
