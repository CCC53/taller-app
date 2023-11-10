import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { of, switchMap } from 'rxjs';
import * as loadash from 'lodash';
import { VehicleFieldsModel, vehicleFormOptions, vehicleViewFields } from './vehicle.component.fields';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Vehicle } from 'src/app/types/vehicles';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  id: string | null = null;
  isLoading: boolean = false;
  changed: boolean = false;
  form = new FormGroup({});
  model: VehicleFieldsModel = {} as VehicleFieldsModel;
  original: VehicleFieldsModel = {} as VehicleFieldsModel;
  options: FormlyFormOptions = vehicleFormOptions;
  fields: FormlyFieldConfig[] = vehicleViewFields;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
      private vehiclesService: VehiclesService, private alertsService: AlertsService) { }

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
        return this.id ? this.vehiclesService.findOne(this.id) : of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.alertsService.hideAlert();
        this.loadVehicle(res.vehicle);
      }
    })
  }

  loadVehicle(vehicle: Vehicle) {
    this.form.reset();
    this.model = vehicle;
    this.original = loadash.cloneDeep(vehicle);
  }

  modelChange(event: VehicleFieldsModel) {
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
    this.vehiclesService.createOne(this.model).subscribe({
      next: res => {
        this.alertsService.hideAlert();
        setTimeout(() => {
          this.alertsService.showSucessCreate(this.router, this.activatedRoute, res.vehicle.id);
          this.loadVehicle(res.vehicle);
        }, 200);
      },
      error: error => this.alertsService.showErrorAlert(error)
    })
  }

  updateOne() {
    this.alertsService.showLoading();
    if (this.id) {
      this.vehiclesService.updateOne(this.model, this.id).subscribe({
        next: res => {
          this.alertsService.hideAlert();
          this.alertsService.showSuccessAlert();
          this.original = Object.assign({}, this.original, res.vehicle);
          this.changed = false;
        },
        error: error => this.alertsService.showErrorAlert(error)
      })
    }
  }
  
  goBack() {
    this.router.navigateByUrl("/dashboard/vehicles");
  }

}
