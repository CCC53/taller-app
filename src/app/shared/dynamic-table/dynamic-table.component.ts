import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AlertsService } from 'src/app/services/alerts.service';
import { DynamicTableService } from 'src/app/services/dynamic-table.service';
import { DynamicTableData, DynamicTableOptions } from 'src/app/types/shared';
import { textOnlyRegex, blankSpaceRegex, denyValuesInSearch } from 'src/app/validators/form.validators.handlers';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  // Options
  @Input() options: DynamicTableOptions = {} as DynamicTableOptions;
  // Optional data
  @Input() populatedData?: DynamicTableData;
  @Output() removeFromService: EventEmitter<any> = new EventEmitter();
  // Table
  data: DynamicTableData = {
    data: [],
    totalCount: 0
  };
  displayedColumns: string[] = [];
  searchInput: FormControl = new FormControl();
  
  // Paginator
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageIndex: number = 0;
  pageSize: number = 5;
  
  constructor(private router: Router, private dynamicTableService: DynamicTableService,
    private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumns.concat(this.options.columns.map(x => x.key));
    this.displayedColumns.push("actions");
    this.searchInput.addValidators([Validators.pattern(textOnlyRegex), Validators.pattern(blankSpaceRegex), denyValuesInSearch])
    this.loadData();
  }

  loadData() {
    this.dynamicTableService.loadData(this.options.table, this.pageIndex+1, this.pageSize).subscribe(res => {
      this.data.data = res.data;
      this.data.totalCount = res.totalCount;
      this.alertsService.hideAlert();
    })
  }

  loadSearch(search: string) {
    this.dynamicTableService.getDataFromSearch(this.options.table, search, this.pageIndex+1, this.pageSize).subscribe(res =>{
        this.data = res;
    });
  }

  handlePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchInput.value ? this.loadSearch(this.searchInput.value) : this.loadData();
  }

  handleSearchInput() {
    this.searchInput.valid && this.searchInput.value?.trim().length >= 3 ? this.loadSearch(this.searchInput.value) : this.loadData();
  }

  viewRow(item: any) {
    this.router.navigateByUrl(`/dashboard/${this.options.table}/${item.id}`);
  }

  deleteRowButton(item: any) {
    Swal.fire({
      title: !this.populatedData ? '¿Desea eliminar este registro?' : '¿Desea remover el registro de este servicio?',
      text: !this.populatedData ? "No podrá revertir esto" : "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.populatedData ? this.removeFromService.emit(item) : this.deleteItem(item);
      }
    })
  }

  deleteItem(item: any) {
    this.dynamicTableService.removeRow(this.options.table, item).subscribe(({ deleted }) => {
      if (deleted) {
        this.searchInput ? this.loadSearch(this.searchInput.value) : this.loadData();
      }
    })
  }
}
