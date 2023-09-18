import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() opened: boolean = false;
  @Output() openValue: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  toggle(): void {
    this.opened = true;
    this.openValue.emit(this.opened);
  }
}
