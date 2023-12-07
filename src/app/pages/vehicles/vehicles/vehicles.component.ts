import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { ValidRoles } from 'src/app/types/auth';
import { DynamicTableOptions } from 'src/app/types/shared';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  allowCreate: boolean = true;
  options: DynamicTableOptions = {
    columns: [
      { key: "brand", label: 'Marca' },
      { key: "model", label: 'Modelo' },
      { key: "type", label: 'Tipo', pipe: 'vehicleType' },
      { key: "year", label: 'Año' }
    ],
    table: 'vehicles',
    searchLabel: 'Buscar por modelo o marca',
    showIcon: true,
    allowSearch: true,
    allowedDelete: true,
    allowedEdit: true,
    allowPagination: true,
  }

  constructor(private router: Router, private authService: AuthService, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.alertsService.showLoading();
    this.authService.getMe().subscribe(({ me }) => {
      const { role } = me;
      if (role === ValidRoles.MECHANIC) {
        this.options.allowedDelete = false;
        this.options.allowedEdit = false;
        this.allowCreate = false;
      }
    });
  }

  newVehicle() {
    this.router.navigateByUrl("/dashboard/vehicles/nuevo");
  }
}
