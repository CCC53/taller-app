import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LoginFormModel, loginFormFields } from './login.component.fields';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  model: LoginFormModel = { email: '', password: '' };
  fields: FormlyFieldConfig[] = loginFormFields;

  constructor(private router: Router, private authService: AuthService, private alertsService: AlertsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.alertsService.showLoading();
    this.authService.login(this.model).subscribe({
      next: res => {
        this.alertsService.hideAlert();
        this.router.navigateByUrl("/")
      },
      error: error => {
        this.alertsService.hideAlert();
        this.alertsService.showErrorAlert(error)
      }
    })
  }

}
