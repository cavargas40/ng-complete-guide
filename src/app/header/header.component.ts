import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onSelectMenu = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }

  selectMenu(menu: string){
    this.onSelectMenu.emit(menu);
  }

}
