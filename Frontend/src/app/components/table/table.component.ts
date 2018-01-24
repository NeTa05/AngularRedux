import { Component, Inject, Input } from '@angular/core';
/*import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.state';
import * as StoreActions from '../../redux/store.actions';
import {
	Store as StoreModel
} from '../../models/store.model';

*/
import {
	Http, 
	Response,
	RequestOptions,
  	Headers
  	
} from '@angular/http';


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
	//stores: StoreModel[];
	
	constructor(private http: Http) {  
		/*store.subscribe(() => this.readState());
		this.store.dispatch(StoreActions.get());
		this.readState();*/
		this.getApi();
	}


	getApi(): void {

    	const headers = new Headers();
      	headers.append('Authorization', 'Basic am9yZ2U6Z2FwMTIz');

       const options = new RequestOptions({headers: headers});
       this.http.get(
           "http://localhost:8000/services/stores",
           options
       ).subscribe((res: Response) => {
       		console.log(res.json());
       });
  	}
}
