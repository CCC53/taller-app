import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { of, switchMap } from 'rxjs';
import * as loadash from 'lodash';
import { SparePartFieldsModel, sparePartFormOptions, sparePartViewFields } from './spare-part.component.fields';
import { SparePartsService } from 'src/app/services/spare-parts.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SparePart } from 'src/app/types/spare-parts';

@Component({
  selector: 'app-spare-part',
  templateUrl: './spare-part.component.html',
  styleUrls: ['./spare-part.component.scss']
})
export class SparePartComponent implements OnInit {

  id: string | null = null;
  isLoading: boolean = false;
  changed: boolean = false;
  form = new FormGroup({});
  model: SparePartFieldsModel = {} as SparePartFieldsModel
  original: SparePartFieldsModel = {} as SparePartFieldsModel;
  options: FormlyFormOptions = sparePartFormOptions;
  fields: FormlyFieldConfig[] = sparePartViewFields;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private sparePartsSerice: SparePartsService, private alertsService: AlertsService) { }

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
        return this.id ? this.sparePartsSerice.findOne(this.id) : of(null);
      })
    ).subscribe(res => {
      this.alertsService.hideAlert();
      if (res) {
        this.loadSparePart(res.sparePart);
      }
    })
  }

  loadSparePart({ name, disponible, price, purchaseDate, supplier, type }: SparePart) {
    this.form.reset();
    this.model = {
      name, disponible, price, purchaseDate, supplier, type
    }
    this.original = loadash.cloneDeep({ name, disponible, price, purchaseDate, supplier, type });
  }

  modelChange(event: SparePartFieldsModel) {
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
    this.sparePartsSerice.createOne(this.model).subscribe({
      next: res => {
        this.alertsService.hideAlert();
        setTimeout(() => {
          this.alertsService.showSucessCreate(this.router, this.activatedRoute, res.sparePart.id);
          this.loadSparePart(res.sparePart);
        }, 200);
      },
      error: error => this.alertsService.showErrorAlert(error)
    })
  }

  updateOne() {
    this.alertsService.showLoading();
    if (this.id) {
      this.sparePartsSerice.updateOne(this.model, this.id).subscribe({
        next: res => {
          this.alertsService.hideAlert();
          this.alertsService.showSuccessAlert();
          this.original = Object.assign({}, this.original, res.sparePart);
          this.changed = false;
        },
        error: error => this.alertsService.showErrorAlert(error)
      })
    }
  }

  goBack() {
    this.router.navigateByUrl("/dashboard/spare-parts");
  }

}
