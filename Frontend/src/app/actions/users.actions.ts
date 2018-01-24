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
export class UsersActions {
  static USERS_GET = 'USERS_GET';
  static USERS_DELETE = 'USERS_DELETE';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: Http
  ) { }
  
  getUsers() {
    console.log('action');
    this.ngRedux.dispatch({
      type: UsersActions.USERS_GET,
    });
    
    const headers = new Headers();
    headers.append('Authorization', 'application/json');
    //headers.append('Authorization', 'Basic am9yZ2U6Z2FwMTIz');

    const options = new RequestOptions({headers: headers});
    this.http.get(
      "http://localhost:8000/services/stores",
       options
    ).subscribe((res: Response) => {
      const list = res.json();
      console.log(res.json());
      this.ngRedux.dispatch({
        type: UsersActions.USERS_GET,
        payload: {
          list
        }
      });
    });
  }

  deleteUser(id): void {
    this.ngRedux.dispatch({
      type: UsersActions.USERS_DELETE,
      payload: { id }
    });
  }

}
