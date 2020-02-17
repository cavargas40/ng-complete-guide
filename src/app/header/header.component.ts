import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { DataStorageService } from 'app/shared/data-storage.service';
import { User } from 'app/auth/user.model';
import { AppState } from 'app/store/app.reducer';
import { Logout } from 'app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean = false;
  private subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe((user: User) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}
