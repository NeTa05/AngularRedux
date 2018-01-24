import { Component, Inject, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { User } from '../../model/users';
import { Store } from '../../models/store.model';
import { StoresActions } from '../../actions/stores.actions';
import { UsersActions } from '../../actions/users.actions';

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
	@select() public users: Observable<User>;

	constructor(public storesActions:  StoresActions, public usersActions: UsersActions) {  
		storesActions.getStores();
		usersActions.getUsers();
		console.log(this.stores);
	}
}
