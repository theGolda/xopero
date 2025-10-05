import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { loadUser, synchronizeUser, toggleUserFavorite } from '@store/store.actions'
import { selectCurrentUser, selectLoading } from '@store/store.selectors'
import { CommonModule } from '@angular/common'
import { UserModel } from '@models/user.model'
import { Observable } from 'rxjs'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  imports: [CommonModule, RouterModule, MatSlideToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser)
  userId: number = this.activatedRoute.snapshot.params['id'];
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(public activatedRoute: ActivatedRoute, public store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser({ userId: this.userId }));
  }

  synchronizeUser(id: number) {
    this.store.dispatch(synchronizeUser({ id }));
  }

  toggleFavorite(user: UserModel, isFavorite: boolean) {
    this.store.dispatch(toggleUserFavorite({ userId: user.id, isFavorite }));
  }
}
