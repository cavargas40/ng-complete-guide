import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public menuOption: string = 'recipes';
  public title = 'ng-complete-guide';

  changeMenu(menu: any) {
    this.menuOption = menu;
  }
}
