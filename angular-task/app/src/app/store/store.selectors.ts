import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './store.reducer'

export const selectCounterState = createFeatureSelector<State>('user');

export const selectCurrentUser = createSelector(
  selectCounterState,
  (state) => state.currentUser
);

export const selectFavoriteUsers = createSelector(
  selectCounterState,
  (state) => state.favoriteUsers
);

export const selectUsers = createSelector(
  selectCounterState,
  (state) => state.users
);

export const selectLoading = createSelector(
  selectCounterState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCounterState,
  (state) => state.error
);

