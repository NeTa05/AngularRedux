import { combineReducers } from 'redux';
import { UsersReducer } from './users.reducer';
import { IAppState } from './app.state';

export const rootReducer = combineReducers<IAppState>({
  users: UsersReducer,
});


