import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
  
  get(){
    return 'asd';
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: StoreService, useClass: StoreService }
];
