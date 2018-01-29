import { Injectable } from '@angular/core';
import { AppState } from '../stores/app.state';
import { NgRedux } from '@angular-redux/store';

import {
  Http, 
  Response
} from '@angular/http';

import { CommonService } from '../services/common.service';

@Injectable()
export class ArticlesActions {
  static ARTICLES_GET = 'ARTICLES_GET';
  static ARTICLES_DELETE = 'ARTICLES_DELETE';
  static ARTICLES_POST = 'ARTICLES_POST';
  static ARTICLES_PUT = 'ARTICLES_PUT';

  constructor(private ngRedux: NgRedux<AppState>, private http: Http, private commonService: CommonService) { }
  
  getArticles() {    
    this.http.get(
      "http://localhost:8000/services/articles",
       this.commonService.getHeaders()
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

  deleteArticle(id): void {

    this.http.delete(
      "http://localhost:8000/services/articles/"+id ,
       this.commonService.getHeaders()
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
       this.commonService.getHeaders()
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
       this.commonService.getHeaders()
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
