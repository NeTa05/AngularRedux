import { Component, Inject, Input } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.state';
import * as StoreActions from '../../redux/store.actions';
import {
	Store as StoreModel
} from '../../models/store.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
	`.actions {
		width: 150px;
	}
	.actions > a {
		width: 75px;
	}
	`
  ]
})
export class TableComponent{
	stores: StoreModel[];
	
	constructor(@Inject(AppStore) private store: Store<AppState>) {  
		store.subscribe(() => this.readState());
		this.store.dispatch(StoreActions.get());
		this.readState();
	}

	readState() {
		const state: AppState = this.store.getState() as AppState;
		this.stores = state.stores;
	}
}
