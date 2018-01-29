import { Injectable } from '@angular/core';
import { AppState } from '../stores/app.state';
import { NgRedux } from '@angular-redux/store';

import {
  Http, 
  Response
} from '@angular/http';

import { CommonService } from '../services/common.service';

@Injectable()
export class StoresActions {
  static STORES_GET = 'STORES_GET';
  static STORES_DELETE = 'STORES_DELETE';
  static STORES_POST = 'STORES_POST';
  static STORES_PUT = 'STORES_PUT';

  constructor(private ngRedux: NgRedux<AppState>,private http: Http, private commonService: CommonService) { }
  
  getStores() {    
    this.http.get(
      "http://localhost:8000/services/stores",
       this.commonService.getHeaders()
    ).subscribe((res: Response) => {
      const stores = res.json().store;
      this.ngRedux.dispatch({
        type: StoresActions.STORES_GET,
        payload: {
          stores
        }
      });
    });
  }

  deleteStore(id): void {

    this.http.delete(
      "http://localhost:8000/services/stores/"+id ,
       this.commonService.getHeaders()
    ).subscribe((res: Response) => {
      const list = res.json();
      this.ngRedux.dispatch({
        type: StoresActions.STORES_DELETE,
        payload: { id }
      });
    });
  }

  createStore(jsonStore: any) {
    this.http.post(
      "http://localhost:8000/services/stores/" ,
      JSON.stringify(jsonStore),
       this.commonService.getHeaders()
    ).subscribe((res: Response) => {
      const list = res.json();
      this.ngRedux.dispatch({
        type: StoresActions.STORES_POST,
        payload: { store: list.store }
      });
    },
    errorResponse => { 
      const error = errorResponse.json();
      alert(error.error_message);
    });
  }

  updateStore(store: any) {
    this.http.put(
      "http://localhost:8000/services/stores/"+ store.id ,
      JSON.stringify(store),
       this.commonService.getHeaders()
    ).subscribe((res: Response) => {
      const stores = res.json().store;
      this.ngRedux.dispatch({
        type: StoresActions.STORES_PUT,
        payload: { stores }
      });
    },
    errorResponse => { 
      const error = errorResponse.json();
      alert(error.error_message);
    });
  }

}
