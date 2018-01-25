import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfirmationModalComponent } from '../../utils/confirmation-modal.component';
import { StoresActions } from '../../actions/stores.actions';


@Component({
  selector: 'app-header',
  templateUrl: '/header.component.html',
  styles: [
	`.logo {
		width: 75px;
    	float: left;
    	margin-right: 15px;
		}
    `]
})
export class HeaderComponent {

  constructor(private _bsModalService: BsModalService, public storesActions:  StoresActions) { 
  }

  addStore(){
    this.showConfirmationModal();
  }

  showConfirmationModal(): void {
    const modal = this._bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
        'Add store',
        'Body text'
    );
    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
        if (result.submit) {
          this.storesActions.createStore(result.store);
          console.log('Yes');
        } else {
          console.log('no');
        }
    });
}

}
