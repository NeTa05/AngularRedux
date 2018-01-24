import { StoresActions } from '../actions/stores.actions';
import { Stores } from '../models/stores.model';

const INITIAL_STATE: Stores = {
  stores: []
};

export function StoresReducer(state: Stores = INITIAL_STATE, action: any): any {

  switch (action.type) {
    case StoresActions.STORES_GET:
      return Object.assign({}, state, { stores: action.payload.stores });
    case StoresActions.STORES_DELETE:
      let stores = state.stores.filter(({ id }) => id !== action.payload.id);
      return Object.assign({}, state, { stores: stores }); 
    default:
      return state;
  }
}
