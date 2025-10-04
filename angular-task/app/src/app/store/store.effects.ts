import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '@services/user.service';
import { WebsocketService } from '@services/websocket.service';
import { environment } from '@environments/environment';
import { 
  loadUsers, 
  loadUsersSuccess, 
  loadUsersFailure,
  connectWebSocket,
  synchronizeUser,
  userSynchronized,
  loadUser,
  loadUserSuccess,
  loadUserFailure
} from './store.actions';

@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private websocketService: WebsocketService,
    private store: Store
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(({ userId }) =>
        this.userService.getUser(userId).pipe(
          map(user => loadUserSuccess({ user })),
          catchError(error => of(loadUserFailure({ error: error.message })))
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  connectWebSocket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectWebSocket),
      tap(() => {
        this.websocketService.connect(environment.websocketUrl).subscribe(msg => {
          console.log("New message:", msg);
          try {
            const response = JSON.parse(msg);
            if (response.payload) {
              this.store.dispatch(userSynchronized({ user: response.payload }));
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        });
      })
    ), { dispatch: false }
  );

  synchronizeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(synchronizeUser),
      tap(({ userName }) => {
        console.log('starting synchronization');
        const message = JSON.stringify({
          type: 'SynchronizeUser',
          payload: userName,
        });
        this.websocketService.sendMessage(message);
      })
    ), { dispatch: false }
  );
}
