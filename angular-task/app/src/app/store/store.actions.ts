import { createAction, props } from '@ngrx/store'
import { UserModel } from '@models/user.model'

// User management actions
export const setCurrentUser = createAction('[User] Set current user', props<{ user: UserModel }>());
export const addUserToFavorite = createAction('[User] Add user to favorite', props<{ user: UserModel }>());
export const removeUserFromFavorite = createAction('[User] Remove user from favorite', props<{ user: UserModel }>());

// User loading actions
export const loadUsers = createAction('[User] Load users');
export const loadUsersSuccess = createAction('[User] Load users success', props<{ users: UserModel[] }>());
export const loadUsersFailure = createAction('[User] Load users failure', props<{ error: string }>());

// WebSocket actions
export const connectWebSocket = createAction('[User] Connect WebSocket');
export const synchronizeUser = createAction('[User] Synchronize user', props<{ userName: string }>());
export const userSynchronized = createAction('[User] User synchronized', props<{ user: UserModel }>());
