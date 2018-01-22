/**
 * Counter Reducer
 */
import { Reducer, Action } from 'redux';
import { AppState } from './app.state';
import {
  GET
} from './store.actions';

import {
  Store as StoreModel
} from '../models/store.model';

const initialState: AppState = { stores: [
    new StoreModel(1, 'Store1', 'Address1'),
    new StoreModel(1, 'Store1', 'Address1')
  ] 
};

export const counterReducer: Reducer<AppState> =
  (state: AppState, action: Action): AppState => {
    switch (action.type) {
      case GET:       
        return Object.assign({}, state, { stores: [
                new StoreModel(1, 'Store1', 'Address1'),
                new StoreModel(1, 'Store2', 'Address2')]
              });
      default:
        return state;
    }
  };
