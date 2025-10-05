import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { loadUser, synchronizeUser, toggleUserFavorite } from '@store/store.actions';
import { selectCurrentUser, selectLoading } from '@store/store.selectors';
import { UserModel } from '@models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  imports: [CommonModule, RouterModule, MatSlideToggleModule, MatButtonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  public user$ = this._store.select(selectCurrentUser);
  public userId: number = this._activatedRoute.snapshot.params['id'];
  public loading$: Observable<boolean> = this._store.select(selectLoading);

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _store: Store
  ) {}

  public ngOnInit(): void {
    this._store.dispatch(loadUser({ userId: this.userId }));
  }

  public synchronizeUser(id: number): void {
    this._store.dispatch(synchronizeUser({ id }));
  }

  public toggleFavorite(user: UserModel, isFavorite: boolean): void {
    this._store.dispatch(toggleUserFavorite({ userId: user.id, isFavorite }));
  }
}
