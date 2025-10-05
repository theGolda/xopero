import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { WebsocketService } from '@services/websocket/websocket.service';
import { WebSocketMessageFactory } from '@services/websocket/websocket-message-factory';
import { environment } from '@environments/environment';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  connectWebSocket,
  synchronizeUser,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  toggleUserFavorite,
  toggleUserFavoriteSuccess,
  toggleUserFavoriteFailure
} from './store.actions';

@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private websocketService: WebsocketService
  ) { }

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
      switchMap(() => {
        this.websocketService.connect(environment.websocketUrl);
        return of({ type: '[WebSocket] Connected' });
      })
    ), { dispatch: false }
  );

  synchronizeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(synchronizeUser),
      switchMap(({ id }) => {
        console.log('starting synchronization');
        const message = WebSocketMessageFactory.createSynchronizeUserMessage(id);
        this.websocketService.sendMessage(message);
        return of({ type: '[WebSocket] Synchronize message sent' });
      })
    ), { dispatch: false }
  );

  toggleUserFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleUserFavorite),
      switchMap(({ userId, isFavorite }) =>
        this.userService.updateUserFavorite(userId, isFavorite).pipe(
          map(user => toggleUserFavoriteSuccess({ user })),
          catchError(error => of(toggleUserFavoriteFailure({ error: error.message })))
        )
      )
    )
  );
}
