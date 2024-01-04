import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServicesService } from 'src/app/services/services.service';
import { ValidRoles } from 'src/app/types/auth';
import { DynamicTableOptions } from 'src/app/types/shared';

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
    searchLabel: 'Buscar por motivo',
    showIcon: true,
    allowSearch: true,
    allowedDelete: true,
    allowedEdit: true,
    allowPagination: true,
  }

  constructor(private router: Router, private serviceService: ServicesService,
    private authService: AuthService, private alertsService: AlertsService) {
  }

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

  newService() {
    this.router.navigateByUrl("/dashboard/services/nuevo");
  }

}
