import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { ValidRoles } from 'src/app/types/auth';
import { DynamicTableOptions } from 'src/app/types/shared';

@Component({
  selector: 'app-spare-parts',
  templateUrl: './spare-parts.component.html',
  styleUrls: ['./spare-parts.component.scss']
})
export class SparePartsComponent implements OnInit {

  options: DynamicTableOptions = {
    columns: [
      { key: "name", label: 'Nombre' },
      { key: 'supplier', label: 'Proveedor' },
      { key: "disponible", label: 'Cantidad disponible' },
      { key: "price", label: 'Precio unitario', pipe: 'currency' },
      { key: "type", label: 'Tipo', pipe: 'sparePartType' }
    ],
    table: 'spare-parts',
    searchLabel: 'Buscar por nombre o proveedor',
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
      }
    });
  }

  newSparePart() {
    this.router.navigateByUrl("/dashboard/spare-parts/nuevo");
  }

}
