import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State } from './store.reducer';

export const selectUserState = createFeatureSelector<State>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.currentUser
);


export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);

