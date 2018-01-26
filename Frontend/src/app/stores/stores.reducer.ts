import { StoresActions } from '../actions/stores.actions';
import { Stores } from '../models/stores.model';

const INITIAL_STATE: Stores = {
  stores: []
};

export function StoresReducer(state: Stores = INITIAL_STATE, action: any): any {
  let stores;
  switch (action.type) {
    case StoresActions.STORES_GET:
      return Object.assign({}, state, { stores: action.payload.stores });
    case StoresActions.STORES_DELETE:
      stores = state.stores.filter(({ id }) => id !== action.payload.id);
      return Object.assign({}, state, { stores: stores }); 
    case StoresActions.STORES_POST:
      state.stores.push(action.payload.store);
      return state;
    case StoresActions.STORES_PUT:
      stores = [...state.stores];
      let index = stores.findIndex(({ id }) => id === action.payload.stores.id);
      stores[index] = action.payload.stores;
      return Object.assign({}, state, { stores });
    default:
      return state;
  }
}
