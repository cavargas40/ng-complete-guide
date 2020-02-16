import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'app/shared/ingredient.model';
import {
  AddIngredient,
  UpdateIngredient,
  DeleteIngredient,
  StopEdit
} from '../store/shopping-list.actions';
import { AppState } from 'app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;

  private subscription: Subscription;
  public editMode: boolean = false;
  public editedItem: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            ...this.editedItem
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const { name, amount } = form.value;
    const newIngredient = new Ingredient({ name, amount });
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }
}
