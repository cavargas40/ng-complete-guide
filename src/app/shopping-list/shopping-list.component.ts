import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public ingredients: Observable<{ ingredients: Array<Ingredient> }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Array<Ingredient> } }>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
