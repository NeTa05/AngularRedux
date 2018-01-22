import { Component, OnInit, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.state';
import * as CounterActions from '../../redux/store.actions';
import {
	Store as StoreModel
} from '../../models/store.model';



@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html'
})
export class StoresComponent {

   constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    const state: AppState = this.store.getState() as AppState;
    //this.counter = state.counter;
  }

  increment() {
    //this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    //this.store.dispatch(CounterActions.decrement());
  }

}
