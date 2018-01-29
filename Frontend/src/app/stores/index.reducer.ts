import { combineReducers } from 'redux';
import { StoresReducer } from './stores.reducer';
import { ArticlesReducer } from './articles.reducer';
import { AppState } from './app.state';

export const Reducers = combineReducers<AppState>({
  stores: StoresReducer,
  articles: ArticlesReducer
});


