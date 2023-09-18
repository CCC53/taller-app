import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes/pipes.module';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { AssignmentsModalComponent } from './assignments-modal/assignments-modal.component';
import { MatPaginatorIntlEs } from './dynamic-table/dynamic-table-labels.provider';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    DynamicTableComponent,
    AssignmentsModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({}),
    PipesModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEs }
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    DynamicTableComponent,
    AssignmentsModalComponent
  ]
})
export class SharedModule { }
