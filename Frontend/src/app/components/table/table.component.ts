import { Component, OnInit, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.state';
import * as CounterActions from '../../redux/counter.actions';


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
export class TableComponent implements OnInit {

	constructor(@Inject(AppStore) private store: Store<AppState>) {  

	}

	ngOnInit() {
	}

	increment() {
		this.store.dispatch(CounterActions.increment());
	}

}
