import { createReducer, on } from '@ngrx/store';
import { 
  setCurrentUser,
  toggleUserFavorite,
  toggleUserFavoriteSuccess,
  toggleUserFavoriteFailure,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  userSynchronized,
  loadUser,
  loadUserSuccess,
  loadUserFailure
} from './store.actions'
import { UserModel } from '@models/user.model'

export interface State {
  userAmount: number;
  currentUser: UserModel | null;
  users: UserModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  userAmount: 0,
  currentUser: null,
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(setCurrentUser, (state, { user }) => ({
    ...state,
    currentUser: user,
  })),
  on(toggleUserFavoriteSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    currentUser: state.currentUser?.id === user.id ? user : state.currentUser,
  })),
  on(toggleUserFavoriteFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
    error: null,
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    loading: false,
    error,
  })),
  on(loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(userSynchronized, (state, { user }) => ({
    ...state,
    currentUser: user,
  }))
);
