import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { StoreModalComponent } from '../store-modal/store-modal.component';
import { StoresActions } from '../../actions/stores.actions';


@Component({
  selector: 'app-store-header',
  templateUrl: '/store-header.component.html',
  styles: [
	`.logo {
		width: 75px;
    	float: left;
    	margin-right: 15px;
		}
    `]
})
export class StoreHeaderComponent {

  constructor(private _bsModalService: BsModalService, public storesActions:  StoresActions) { 
  }

  addStore(){
    const modal = this._bsModalService.show(StoreModalComponent);
    (<StoreModalComponent>modal.content).showModal(
        'Add store',
        'Body text'
    );
    (<StoreModalComponent>modal.content).onClose.subscribe(result => {
        if (result.submit) {
          this.storesActions.createStore(result.store);
        }
    });
  }
}

}
