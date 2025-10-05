import { createAction, props } from '@ngrx/store'
import { UserModel } from '@models/user.model'

// User management actions
export const setCurrentUser = createAction('[User] Set current user', props<{ user: UserModel }>());
export const toggleUserFavorite = createAction('[User] Toggle user favorite', props<{ userId: number, isFavorite: boolean }>());
export const toggleUserFavoriteSuccess = createAction('[User] Toggle user favorite success', props<{ user: UserModel }>());
export const toggleUserFavoriteFailure = createAction('[User] Toggle user favorite failure', props<{ error: string }>());

// User loading actions
export const loadUser = createAction('[User] Load user', props<{ userId: number }>());
export const loadUserSuccess = createAction('[User] Load user success', props<{ user: UserModel }>());
export const loadUserFailure = createAction('[User] Load user failure', props<{ error: string }>());

export const loadUsers = createAction('[User] Load users');
export const loadUsersSuccess = createAction('[User] Load users success', props<{ users: UserModel[] }>());
export const loadUsersFailure = createAction('[User] Load users failure', props<{ error: string }>());

// WebSocket actions
export const connectWebSocket = createAction('[User] Connect WebSocket');
export const synchronizeUser = createAction('[User] Synchronize user', props<{ id: number }>());
export const userSynchronized = createAction('[User] User synchronized', props<{ user: UserModel }>());
