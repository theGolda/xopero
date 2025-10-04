import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { addUserToFavorite, removeUserFromFavorite, synchronizeUser } from '@store/store.actions'
import { selectCurrentUser, selectFavoriteUsers } from '@store/store.selectors'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  userName!: any
  protectedProjects: any = 0
  projectsSub!: Subscription
  userId!: any
  user: any

  user$ = this.store.select(selectCurrentUser).subscribe(user => {
    //@ts-ignore
    this.userName = user.name
    //@ts-ignore
    this.protectedProjects = user.protectedProjects
    //@ts-ignore
    this.userId = user.id
    //@ts-ignore
    this.user = user
  })

  favoriteUsers$ = this.store.select(selectFavoriteUsers)

  constructor(public router: Router, public store: Store) {
  }


  isUserFavorite(favoriteUsers: any) {
    // @ts-ignore
    return !!favoriteUsers.find(u => u.id === this.userId)
  }

  isNotUserFavorite(favoriteUsers: any) {
    // @ts-ignore
    return !favoriteUsers.find(u => u.id === this.userId)
  }

  goBack() {
    this.router.navigate([])
  }

  synchronizeUser() {
    this.store.dispatch(synchronizeUser({ userName: this.userName }));
  }

  removeFromFavorites() {
    this.store.dispatch(removeUserFromFavorite({ user: this.user }))
  }

  addToFavorites(){
    this.store.dispatch(addUserToFavorite({user: this.user}))

  }
}
