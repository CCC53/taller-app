import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as loadash from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { Employee } from 'src/app/types/employees';
import { AlertsService } from 'src/app/services/alerts.service';
import { UpdateProfileModel, updateProfileViewFields } from './update-profile.component.fields';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  isLoading: boolean = false;
  changed: boolean = false;
  form = new FormGroup({});
  model: UpdateProfileModel = {} as UpdateProfileModel;
  original: UpdateProfileModel = {} as UpdateProfileModel;
  fields: FormlyFieldConfig[] = updateProfileViewFields;

  constructor(private authService: AuthService, private alertsService: AlertsService, private router: Router) { }

  ngOnInit(): void {
    this.alertsService.showLoading();
    this.authService.getMe().subscribe(({ me }) => {
      this.loadProfile(me);
      this.alertsService.hideAlert();
    })
  }

  loadProfile({ name, email, role }: Employee) {
    this.model = {
      name: name,
      email: email,
      role: role
    };
    this.original = loadash.cloneDeep({name, email, role});
  }

  modelChange(event: UpdateProfileModel) {
    this.changed = !loadash.isEqual(this.original, event);
  }

  onSubmit() {
    this.alertsService.showLoading();
    this.authService.updateProfile(this.model).subscribe(res => {
      this.alertsService.hideAlert();
      this.alertsService.showSuccessAlert(this.router, "services");
      this.original = Object.assign({}, this.original, res.me);
      this.changed = false;
    });
  }

  goBack() {
    this.router.navigateByUrl("/dashboard/services");
  }

}
