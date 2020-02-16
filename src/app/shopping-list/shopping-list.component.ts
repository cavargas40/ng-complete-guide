import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'app/shared/ingredient.model';
import { StartEdit } from './store/shopping-list.actions';
import { AppState } from 'app/store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public subscription: Subscription;
  public ingredients: Observable<{ ingredients: Array<Ingredient> }>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
