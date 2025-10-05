import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { addUserToFavorite, loadUser, removeUserFromFavorite, synchronizeUser } from '@store/store.actions'
import { selectCurrentUser, selectFavoriteUsers, selectLoading } from '@store/store.selectors'
import { CommonModule } from '@angular/common'
import { UserModel } from '@models/user.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser)

  favoriteUsers$ = this.store.select(selectFavoriteUsers)
  userId: number = this.activatedRoute.snapshot.params['id'];
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(public activatedRoute: ActivatedRoute, public store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser({ userId: this.userId }));
  }

  isUserFavorite(favoriteUsers: UserModel[] | null): boolean {
    if (!favoriteUsers) return false;
    return !!favoriteUsers.find(u => u.id === this.userId);
  }

  isNotUserFavorite(favoriteUsers: UserModel[] | null): boolean {
    if (!favoriteUsers) return true;
    return !favoriteUsers.find(u => u.id === this.userId);
  }

  synchronizeUser(userName: string) {
    this.store.dispatch(synchronizeUser({ userName }));
  }

  removeFromFavorites(user: UserModel) {
    this.store.dispatch(removeUserFromFavorite({ user }));
  }

  addToFavorites(user: UserModel) {
    this.store.dispatch(addUserToFavorite({ user }));
  }
}
