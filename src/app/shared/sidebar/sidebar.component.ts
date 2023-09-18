import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { Route } from 'src/app/types/shared';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<boolean>();

  routes: Route[] = this.loadRoutes();

  constructor(private authService: AuthService, private router: Router, private alertsService: AlertsService) { }

  ngOnInit(): void {}

  loadRoutes(): Route[] {
    const menu = localStorage.getItem('menu');
    return menu && JSON.parse(menu);
  }

  logout() {
    this.alertsService.showLoading();
    this.authService.logout().subscribe(res => {
      if (res.logout) {
        this.alertsService.hideAlert();
        localStorage.removeItem('menu')
        this.router.navigateByUrl("/login")
      }
    })
  }

  toggle() {
    let open = true;
    this.toggleSidebar.emit(!open);
  }

}
