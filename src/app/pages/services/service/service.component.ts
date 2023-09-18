import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import * as loadash from 'lodash';
import { of, switchMap } from 'rxjs';
import { ServicesService } from 'src/app/services/services.service';
import { ServiceFieldsModel, addEmployee, addSparePart, serviceFormOptions, serviceViewFields } from './service.component.fields';
import { AlertsService } from 'src/app/services/alerts.service';
import { DynamicTableData, DynamicTableOptions } from 'src/app/types/shared';
import { Employee } from 'src/app/types/employees';
import { SparePart } from 'src/app/types/spare-parts';
import { AssignmentsService } from 'src/app/services/assignments.service';
import Swal from 'sweetalert2';
import { AssignmentsModalData } from 'src/app/types/assignments';
import { Service } from 'src/app/types/services';
import { AuthService } from 'src/app/services/auth.service';
import { ValidRoles } from '../../../types/auth';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  
  id: string | null = null;
  isLoading: boolean = false;
  changed: boolean = false;
  form = new FormGroup({});
  model: ServiceFieldsModel = { issue: '', startDate: null, endDate: null, vehicleID: '' }
  original: ServiceFieldsModel = {} as ServiceFieldsModel;
  options: FormlyFormOptions = serviceFormOptions;
  fields: FormlyFieldConfig[] = serviceViewFields;
  employeesTableOptions: DynamicTableOptions = {
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'email', label: 'Email' }
    ],
    table: 'employees',
    allowSearch: false,
    allowedDelete: true,
    allowedEdit: false,
    allowPagination: false,
    showIcon: true,
  }
  employeesTableData: DynamicTableData = {
    data: [],
    totalCount: 0
  };
  sparePartsTableOptions: DynamicTableOptions = {
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'disponible', label: 'Cantidad disponible' },
      { key: 'price', label: 'Precio unitario', pipe: 'currency' },
      { key: 'type', label: 'Tipo de refaccion', pipe: 'sparePartType' }
    ],
    table: 'spare-parts',
    showIcon: true,
    allowSearch: false,
    allowedDelete: true,
    allowedEdit: false,
    allowPagination: false,
  }
  sparePartsTableData: DynamicTableData = {
    data: [],
    totalCount: 0
  };
  addEmployeeFields: FormlyFieldConfig[] = addEmployee;
  addSparePartFields: FormlyFieldConfig[] = addSparePart;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
    private serviceService: ServicesService, private alertsService: AlertsService,
    private assignmentsService: AssignmentsService, private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        this.isLoading = true;
        this.id = paramMap.get("id");
        if (this.id) {
          this.alertsService.showLoading();
          this.options.formState.isNew = false;
        } else {
          this.options.formState.isNew = true;
        }
        this.loadVehicleSelect();
        return this.id ? this.serviceService.findOne(this.id) : of(null);
      }) 
    ).subscribe(res => {
      if (res) {
        this.alertsService.hideAlert();
        this.loadService(res.service);
        this.loadEmployeesAviableSelect();
        this.loadSparePartsAviableSelect();
        this.showIconByRole();
        this.employeesTableData.data = res.service.employees;
        this.employeesTableData.totalCount = res.service.employees.length;
        this.sparePartsTableData.data = res.service.spareParts;
        this.sparePartsTableData.totalCount = res.service.spareParts.length;
      }
    })
  }

  showIconByRole() {
    this.authService.getRole().subscribe(res => {
      if (res === ValidRoles.MECHANIC) {
        this.employeesTableOptions.showIcon = false;
        this.sparePartsTableOptions.showIcon = false;
      }
    })
  }

  loadVehicleSelect() {
    this.assignmentsService.findVehiclesSelect().subscribe(({ vehiclesSelect }) => {
      if (this.fields[3].props) {
        this.fields[3].props.options = vehiclesSelect;
      }
    })
  }

  loadEmployeesAviableSelect() {
    this.assignmentsService.findEmployeesAviable().subscribe(({ employeesAviable }) => {
      if (this.addEmployeeFields[0].props) {
        this.addEmployeeFields[0].props.options = employeesAviable;
      }
    });
  }

  loadSparePartsAviableSelect() {
    this.assignmentsService.findSparePartsAviable().subscribe(({ sparePartsAviable }) => {
      if (this.addSparePartFields[0].props) {
        this.addSparePartFields[0].props.options = sparePartsAviable;
      }
    });
  }

  loadService({ issue, startDate, endDate, vehicleID }: Service) {
    this.form.reset();
    this.model = { 
      issue: issue,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      vehicleID: vehicleID
    }
    this.original = loadash.cloneDeep({issue, startDate, endDate, vehicleID});
  }

  modelChange(event: ServiceFieldsModel) {
    this.changed = !loadash.isEqual(this.original, event);
  }

  onSubmit() {
    if (this.id) {
      this.updateOne();
    } else {
      this.createOne();
    }
  }

  createOne() {
    this.alertsService.showLoading();
    this.serviceService.createOne(this.model).subscribe({
      next: res => {
        this.alertsService.hideAlert();
        setTimeout(() => {
          this.alertsService.showSuccessAlert();
        }, 10);
        this.loadService(res.service);
        this.router.navigate(["..", res.service.id], { relativeTo: this.activatedRoute });
      },
      error: error => this.alertsService.showErrorAlert(error)
    })
  }

  updateOne() {
    this.alertsService.showLoading();
    if (this.id) {
      this.serviceService.updateOne(this.model, this.id).subscribe({
        next: res => {
          this.alertsService.hideAlert();
          this.alertsService.showSuccessAlert();
          this.original = Object.assign({}, this.original, res.service);
          this.changed = false;
        },
        error: error => this.alertsService.showErrorAlert(error)
      })
    }
  }


  viewEmployee(employee: Employee) {
    this.router.navigateByUrl(`/dashboard/employees/${employee.id}`);
  }

  removeEmployee(employee: Employee) {
    Swal.fire({
      title: `¿Desea remover a ${employee.name} de este servicio?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignmentsService.removeEmployeeFromService(employee.id).subscribe(res => {
          if (res.removed) {
            this.employeesTableData.data = this.employeesTableData.data.filter(e => e.id != employee.id);
            this.employeesTableData.totalCount--;
          }
        })
      }
    })
  }

  addNewEmployee() {
    const data: AssignmentsModalData = {
      type: 'employee',
      fields: addEmployee
    }
    const dialog = this.alertsService.openModal(data);
    dialog.afterClosed().subscribe(value => {
      if (this.id) {
        if (value) {
          this.alertsService.showLoading();
          this.assignmentsService.assignEmployeeToService(this.id, value).subscribe({
            next: res => {
              if (res.assigned) {
                this.alertsService.hideAlert();
                this.alertsService.showSuccessAlert();
                this.employeesTableData.data = [...this.employeesTableData.data, res.assigned];
                this.employeesTableData.totalCount++;
              }
            },
            error: error => this.alertsService.showErrorAlert(error)
          });
        }
      }
    })
  }

  addNewSparePart() {
    const data: AssignmentsModalData = {
      type: 'spare-part',
      fields: addSparePart
    }
    const dialog = this.alertsService.openModal(data);
    dialog.afterClosed().subscribe(value => {
      if (this.id ) {
        if (value) {
          this.alertsService.showLoading();
          this.assignmentsService.assignSparePartToService(this.id, value).subscribe({
            next: res => {
              if (res.assigned) {
                this.alertsService.hideAlert();
                this.alertsService.showSuccessAlert();
                this.sparePartsTableData.data = [...this.sparePartsTableData.data, res.assigned];
                this.sparePartsTableData.totalCount++;
              }
            },
            error: error => this.alertsService.showErrorAlert(error)
          });
        }
      }
    })
  }

  viewSparePart(sparePart: SparePart) {
    this.router.navigateByUrl(`/dashboard/spare-parts/${sparePart.id}`);
  }

  removeSparePart(sparePart: SparePart) {
    Swal.fire({
      title: `¿Desea remover a ${sparePart.name} de este servicio?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignmentsService.removeSparePartFromService(sparePart.id).subscribe(res => {
          if (res.removed) {
            this.sparePartsTableData.data = this.sparePartsTableData.data.filter(e => e.id != sparePart.id);
            this.sparePartsTableData.totalCount--;
          }
        })
      }
    })
  }

  goBack() {
    this.router.navigateByUrl("/dashboard/services");
  }

}