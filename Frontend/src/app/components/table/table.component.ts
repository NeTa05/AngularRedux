import { Component, Inject, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Store } from '../../models/store.model';
import { StoresActions } from '../../actions/stores.actions';

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
	@select() public stores: Observable<Store>;

	constructor(public storesActions:  StoresActions) {  
		storesActions.getStores();
		console.log(this.stores);
	}
}
