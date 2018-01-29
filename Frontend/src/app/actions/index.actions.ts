import { StoresActions } from './stores.actions';
import { ArticlesActions } from './articles.actions';


export const Actions: Array<any> = [
  {provide: StoresActions, useClass: StoresActions},
  {provide: ArticlesActions, useClass: ArticlesActions}
];
