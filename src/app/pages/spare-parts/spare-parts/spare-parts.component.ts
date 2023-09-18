import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { SparePartsService } from 'src/app/services/spare-parts.service';
import { ValidRoles } from 'src/app/types/auth';
import { DynamicTableData, DynamicTableOptions, PaginatorData } from 'src/app/types/shared';
import { SparePart } from 'src/app/types/spare-parts';
import Swal from 'sweetalert2';

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

  constructor(private router: Router, private sparePartsService: SparePartsService,
    private authService: AuthService, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.alertsService.showLoading();
    this.loadSpareParts(this.paginatorData.pageIndex, this.paginatorData.pageSize);
    this.authService.getMe().subscribe(({ me }) => {
      const { role } = me;
      if (role === ValidRoles.MECHANIC) {
        this.options.allowedDelete = false;
        this.options.allowedEdit = false;
      }
    });
  }

  loadSpareParts(page: number, pageSize: number) {
    this.sparePartsService.findAll(page, pageSize).subscribe(res => {
      this.data.data = res.spareParts;
      this.data.totalCount = res.totalCount; 
      this.loading = false;
      this.alertsService.hideAlert();
    })
  }

  viewItem(item: SparePart) {
    this.router.navigateByUrl(`/dashboard/spare-parts/${item.id}`)
  }

  deleteItem(item: SparePart) {
    Swal.fire({
      title: '¿Desea eliminar este registro?',
      text: "No podrá revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sparePartsService.deleteOne(item.id).subscribe(res => {
          if (res.deleted) {
            this.data.data = this.data.data.filter((s: SparePart) => s.id != item.id);
          }
        })
      }
    })
  }

  newSparePart() {
    this.router.navigateByUrl("/dashboard/spare-parts/nuevo");
  }

  handlePage(event: PaginatorData) {
    this.paginatorData = event;
    this.loadSpareParts(this.paginatorData.pageIndex+1, this.paginatorData.pageSize);
  }

}
