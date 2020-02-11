import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public ingredients: Array<Ingredient>;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChange
      .subscribe((ingredients) => this.ingredients = ingredients);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
