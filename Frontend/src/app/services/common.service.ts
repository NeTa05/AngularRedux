import { Injectable } from '@angular/core';
import {
  RequestOptions,
  Headers  
} from '@angular/http';

@Injectable()
export class CommonService {

  getHeaders() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic am9yZ2U6Z2FwMTIz');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return new RequestOptions({headers});
  }
}
