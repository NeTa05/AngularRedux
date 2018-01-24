import { combineReducers } from 'redux';
import { UsersReducer } from './users.reducer';
import { StoresReducer } from './stores.reducer';
import { IAppState } from './app.state';

export const rootReducer = combineReducers<IAppState>({
  users: UsersReducer,
  stores: StoresReducer
});


