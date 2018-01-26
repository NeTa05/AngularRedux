import { Component, Inject, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Store } from '../../models/store.model';
import { StoresActions } from '../../actions/stores.actions';
import { StoreModalComponent } from '../store-modal/store-modal.component';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-store-table',
  templateUrl: './store-table.component.html',
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
export class StoreTableComponent{
	@select() public stores: Observable<Store>;

	constructor(public storesActions:  StoresActions, private _bsModalService: BsModalService) {  
		storesActions.getStores();
	}

	editStore(store: any){
    	const modal = this._bsModalService.show(StoreModalComponent);
		(<StoreModalComponent>modal.content).showModal(
		    'Edit store',
		    'Body text',
		    store
		);
		(<StoreModalComponent>modal.content).onClose.subscribe(result => {
		    if (result.submit) {
		    	result.store.id = store.id;
      			this.storesActions.updateStore(result.store);
		    } 
		});
  	}
}
