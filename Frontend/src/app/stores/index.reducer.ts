import { combineReducers } from 'redux';
import { StoresReducer } from './stores.reducer';
import { AppState } from './app.state';

export const Reducers = combineReducers<AppState>({
  stores: StoresReducer
});


