import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { addUserToFavorite, removeUserFromFavorite, synchronizeUser } from '@store/store.actions'
import { selectCurrentUser, selectFavoriteUsers } from '@store/store.selectors'
import { CommonModule } from '@angular/common'
import { UserModel } from '@models/user.model'

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  userName: string = '';
  protectedProjects: number = 0;
  projectsSub!: Subscription;
  userId: string | number = '';
  user: UserModel | null = null;

  user$ = this.store.select(selectCurrentUser).subscribe(user => {
    if (user) {
      this.userName = user.name || '';
      this.protectedProjects = user.protectedProjects || 0;
      this.userId = user.id;
      this.user = user;
    }
  })

  favoriteUsers$ = this.store.select(selectFavoriteUsers)

  constructor(public router: Router, public store: Store) {
  }


  isUserFavorite(favoriteUsers: UserModel[] | null): boolean {
    if (!favoriteUsers) return false;
    return !!favoriteUsers.find(u => u.id === this.userId);
  }

  isNotUserFavorite(favoriteUsers: UserModel[] | null): boolean {
    if (!favoriteUsers) return true;
    return !favoriteUsers.find(u => u.id === this.userId);
  }

  goBack() {
    this.router.navigate([])
  }

  synchronizeUser() {
    this.store.dispatch(synchronizeUser({ userName: this.userName }));
  }

  removeFromFavorites() {
    if (this.user) {
      this.store.dispatch(removeUserFromFavorite({ user: this.user }));
    }
  }

  addToFavorites() {
    if (this.user) {
      this.store.dispatch(addUserToFavorite({ user: this.user }));
    }
  }
}
