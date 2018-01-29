import { Injectable } from '@angular/core';
import { AppState } from '../stores/app.state';
import { NgRedux } from '@angular-redux/store';

import {
  Http, 
  Response,
  RequestOptions,
  Headers  
} from '@angular/http';


@Injectable()
export class ArticlesActions {
  static ARTICLES_GET = 'ARTICLES_GET';
  static ARTICLES_DELETE = 'ARTICLES_DELETE';
  static ARTICLES_POST = 'ARTICLES_POST';
  static ARTICLES_PUT = 'ARTICLES_PUT';

  constructor(private ngRedux: NgRedux<AppState>,private http: Http) { }
  
  getArticles() {    
    this.http.get(
      "http://localhost:8000/services/articles",
       this.generateHeaders()
    ).subscribe((res: Response) => {
      console.log(res);
      
      const articles = res.json().article;
      this.ngRedux.dispatch({
        type: ArticlesActions.ARTICLES_GET,
        payload: {
          articles
        }
      });
    });
  }

  generateHeaders() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic am9yZ2U6Z2FwMTIz');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return new RequestOptions({headers: headers});
  }

  deleteArticle(id): void {

    this.http.delete(
      "http://localhost:8000/services/articles/"+id ,
       this.generateHeaders()
    ).subscribe((res: Response) => {
      const list = res.json();
      this.ngRedux.dispatch({
        type: ArticlesActions.ARTICLES_DELETE,
        payload: { id }
      });
    });
  }

  createStore(jsonStore: any) {
    this.http.post(
      "http://localhost:8000/services/stores/" ,
      JSON.stringify(jsonStore),
       this.generateHeaders()
    ).subscribe((res: Response) => {
      const list = res.json();
      this.ngRedux.dispatch({
        type: ArticlesActions.ARTICLES_POST,
        payload: { store: list.store }
      });
    },
    errorResponse => { 
      const error = errorResponse.json();
      alert(error.error_message);
    });
  }

  updateArticle(article: any) {
    this.http.put(
      "http://localhost:8000/services/articles/"+ article.id ,
      JSON.stringify(article),
       this.generateHeaders()
    ).subscribe((res: Response) => {
      const articles = res.json().article;
      this.ngRedux.dispatch({
        type: ArticlesActions.ARTICLES_PUT,
        payload: { articles }
      });
    },
    errorResponse => { 
      const error = errorResponse.json();
      alert(error.error_message);
    });
  }

}
