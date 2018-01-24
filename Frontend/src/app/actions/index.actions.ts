import { StoresActions } from './stores.actions';

export const Actions: Array<any> = [
  {provide: StoresActions, useClass: StoresActions}
];
