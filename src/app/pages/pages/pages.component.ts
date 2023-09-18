import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  opened: boolean = false;
  mode: MatDrawerMode = 'over';

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.opened = !this.opened;
  }

}
