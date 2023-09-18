import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ValidRoles } from 'src/app/types/auth';
import { DynamicTableData, DynamicTableOptions, PaginatorData } from 'src/app/types/shared';
import { Vehicle } from 'src/app/types/vehicles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  options: DynamicTableOptions = {
    columns: [
      { key: "brand", label: 'Marca' },
      { key: "model", label: 'Modelo' },
      { key: "type", label: 'Tipo', pipe: 'vehicleType' },
      { key: "year", label: 'Año' }
    ],
    table: 'vehicles',
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

  constructor(private router: Router, private vehiclesService: VehiclesService,
    private authService: AuthService, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.alertsService.showLoading();
    this.loadVehicles(this.paginatorData.pageIndex, this.paginatorData.pageSize)
    this.authService.getMe().subscribe(({ me }) => {
      const { role } = me;
      if (role === ValidRoles.MECHANIC) {
        this.options.allowedDelete = false;
        this.options.allowedEdit = false;
      }
    });
  }

  loadVehicles(page: number, pageSize: number) {
    this.vehiclesService.findAll(page, pageSize).subscribe(res => {
      this.data.data = res.vehicles;
      this.data.totalCount = res.totalCount;
      this.loading = false;
      this.alertsService.hideAlert();
    })
  }

  viewItem(item: Vehicle) {
    this.router.navigateByUrl(`/dashboard/vehicles/${item.id}`)
  }

  deleteItem(item: Vehicle) {
    Swal.fire({
      title: '¿Desea eliminar este registro?',
      text: "No podrá revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiclesService.deleteOne(item.id).subscribe(res => {
          if (res.deleted) {
            this.data.data = this.data.data.filter(s => s.id != item.id);
          }
        })
      }
    })
  }

  newVehicle() {
    this.router.navigateByUrl("/dashboard/vehicles/nuevo");
  }

  handlePage(event: PaginatorData) {
    this.paginatorData = event;
    this.loadVehicles(this.paginatorData.pageIndex+1, this.paginatorData.pageSize);
  }

}
