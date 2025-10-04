import { createReducer, on } from '@ngrx/store';
import { 
  addUserToFavorite, 
  removeUserFromFavorite, 
  setCurrentUser,
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
  favoriteUsers: UserModel[];
  users: UserModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  userAmount: 0,
  currentUser: null,
  favoriteUsers: [],
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
  on(addUserToFavorite, (state, { user }) => ({
    ...state,
    favoriteUsers: [...state.favoriteUsers, user]
  })),
  on(removeUserFromFavorite, (state, { user }) => ({
    ...state,
    favoriteUsers: state.favoriteUsers.filter((u) => u.id !== user.id)
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
