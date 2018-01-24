import { Injectable } from '@angular/core';
import { IAppState } from '../store/app.state';
import { NgRedux } from '@angular-redux/store';

import {
  Http, 
  Response,
  RequestOptions,
  Headers  
} from '@angular/http';


@Injectable()
export class StoresActions {
  static STORES_GET = 'STORES_GET';
  static STORES_DELETE = 'STORES_DELETE';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: Http
  ) { }
  
  getStores() {    
    
    this.http.get(
      "http://localhost:8000/services/stores",
       this.generateHeaders()
    ).subscribe((res: Response) => {
      const list = res.json();
      console.log(res.json());
      this.ngRedux.dispatch({
        type: StoresActions.STORES_GET,
        payload: {
          list
        }
      });
    });
  }

  generateHeaders() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic am9yZ2U6Z2FwMTIz');
    return new RequestOptions({headers: headers});
  }

  deleteStore(id): void {
    this.ngRedux.dispatch({
      type: StoresActions.STORES_DELETE,
      payload: { id }
    });
  }

}
