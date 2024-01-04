import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeFieldsModel, employeeFormOptions, employeeViewFields } from './employee.component.fields';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as loadash from 'lodash';
import { EmployeesService } from 'src/app/services/employees.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { of, switchMap } from 'rxjs';
import { Employee } from 'src/app/types/employees';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  id: string | null = null;
  isLoading: boolean = false;
  changed: boolean = false;
  form = new FormGroup({});
  model: EmployeeFieldsModel = {} as EmployeeFieldsModel;
  original: EmployeeFieldsModel = {} as EmployeeFieldsModel;
  options: FormlyFormOptions = employeeFormOptions;
  fields: FormlyFieldConfig[] = employeeViewFields;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private employeesService: EmployeesService, private alertsService: AlertsService) { }

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
        this.form.reset();
        return this.id ? this.employeesService.findOne(this.id) : of(null)
      })
    ).subscribe(res => {
      this.alertsService.hideAlert();
      if (res) {
        this.loadEmployee(res.employee);
      }
    })
  }

  loadEmployee({ name, email, role }: Employee) {
    this.form.reset();
    this.model = {
      name: name,
      email: email,
      role: role
    };
    this.original = loadash.cloneDeep({name, email, role});
  }

  modelChange(event: EmployeeFieldsModel) {
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
    this.employeesService.createOne(this.model).subscribe({
      next: res => {
        this.alertsService.hideAlert();
        setTimeout(() => {
          this.alertsService.showSuccessAlert(this.router, "employees");
          this.loadEmployee(res.employee);
        }, 200);
      },
      error: error => this.alertsService.showErrorAlert(error)
    })
  }

  updateOne() {
    this.alertsService.showLoading();
    if (this.id) {
      this.employeesService.updateOne(this.model, this.id).subscribe({
        next: res => {
          this.alertsService.hideAlert();
          this.alertsService.showSuccessAlert(this.router, "employees");
          this.original = Object.assign({}, this.original, res.employee);
          this.changed = false;
        },
        error: error => this.alertsService.showErrorAlert(error)
      })
    }
  }

  goBack() {
    this.router.navigateByUrl("/dashboard/employees");
  }
}
