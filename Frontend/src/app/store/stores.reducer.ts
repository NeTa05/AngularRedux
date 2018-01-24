import { StoresActions } from '../actions/stores.actions';
import { User } from '../model/users';

import { Store } from '../models/store.model';

/*
const INITIAL_STATE: User[] = [ ];

const FAKE_DATA: User[] = [
  { id: 1, name: 'Fabio' },
  { id: 2, name: 'Lorenzo' },
  { id: 3, name: 'Silvia' },
];
*/
const INITIAL_STATE: Store[] = [ ];
const FAKE_DATA: Store[] = [
  { id: 1, name: 'Fabio', address: '22' },
  { id: 2, name: 'Lorenzo', address: '22' },
  { id: 3, name: 'Silvia', address: '22' },
];


export function StoresReducer(state: Store[] = INITIAL_STATE, action: any): any {

  switch (action.type) {
    case StoresActions.STORES_GET:
      let asd = action.payload.list.stores;
      return action.payload.list.store;//[...FAKE_DATA];
    case StoresActions.STORES_DELETE:
      return state.filter(({ id }) => id !== action.payload.id);

    default:
      return state;
  }
}

