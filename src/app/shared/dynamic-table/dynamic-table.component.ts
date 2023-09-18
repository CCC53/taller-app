import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search.service';
import { DynamicTableData, DynamicTableOptions, PaginatorData } from 'src/app/types/shared';


@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  // Options
  @Input() options: DynamicTableOptions = {} as DynamicTableOptions;
  @Input() data: DynamicTableData = {} as DynamicTableData;
  // Actions
  @Output() viewItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() changePage: EventEmitter<PaginatorData> = new EventEmitter();
  
  displayedColumns: string[] = [];
  search: string | null = null;
  
  // Paginator
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageIndex: number = 0;
  pageSize: number = 5;
  
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumns.concat(this.options.columns.map(x => x.key));
    this.displayedColumns.push("actions");
  }

  loadSearch(search: string) {
    this.searchService.getDataFromSearch(this.options.table, search, this.pageIndex+1, this.pageSize).subscribe(res =>{
      this.data = res;
    })
  }

  restoreData() {
    this.searchService.restoreData(this.options.table, this.pageIndex+1, this.pageSize).subscribe(res =>{
      this.data = res;
    })
  }

  handlePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const data: PaginatorData = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    this.changePage.emit(data);
    this.search ? this.loadSearch(this.search) : this.restoreData();
  }

  handleSearchInput() {
    this.search ? this.loadSearch(this.search) : this.restoreData();
  }
 
}
