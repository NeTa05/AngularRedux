
import { Component, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from './redux/app.store';
import { AppState } from './redux/app.state';
import * as CounterActions from './redux/counter.actions';

import {
	Store as StoreModel
} from './models/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
	counter: number;
	stores: StoreModel[];


	constructor(@Inject(AppStore) private store: Store<AppState>) {
    	store.subscribe(() => this.readState());
	    this.readState();

	    this.stores = [
	      new StoreModel(1, 'Store1', 'Address1'),
	      new StoreModel(1, 'Store1', 'Address1')
	    ];
	    this.store.dispatch(CounterActions.load());
  	}

	readState() {
		const state: AppState = this.store.getState() as AppState;
		this.counter = state.counter;
	}

	decrement() {
		this.store.dispatch(CounterActions.decrement());
	}
}
