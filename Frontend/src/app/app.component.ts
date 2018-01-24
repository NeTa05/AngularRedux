
import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { User } from './model/users';
import { UsersActions } from './actions/users.actions';

import {
	Store as StoreModel
} from './models/store.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

	@select() public users: Observable<User>;

	constructor(public actions:  UsersActions) {
		console.log('component')
		actions.getUsers();
	}
}
