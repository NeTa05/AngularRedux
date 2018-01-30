import { ArticlesActions } from '../actions/articles.actions';
import { Articles } from '../models/articles.model';

const INITIAL_STATE: Articles = {
  articles: []
};

export function ArticlesReducer(state: Articles = INITIAL_STATE, action: any): any {
  let articles;
  switch (action.type) {
    case ArticlesActions.ARTICLES_GET:
      return Object.assign({}, state, { articles: action.payload.articles });
    case ArticlesActions.ARTICLES_DELETE:
      articles = state.articles.filter(({ id }) => id !== action.payload.id);
      return Object.assign({}, state, { articles: articles }); 
    case ArticlesActions.ARTICLES_POST:
      state.articles.push(action.payload.article);
      return state;
    case ArticlesActions.ARTICLES_PUT:
      articles = [...state.articles];
      let index = articles.findIndex(({ id }) => id === action.payload.articles.id);
      articles[index] = action.payload.articles;
      return Object.assign({}, state, { articles });
    default:
      return state;
  }
}
