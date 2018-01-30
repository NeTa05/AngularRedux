import { Injectable } from '@angular/core';
import { AppState } from '../stores/app.state';
import { NgRedux } from '@angular-redux/store';

import {
  Http, 
  Response
} from '@angular/http';

import { CommonService } from '../services/common.service';
import { BASE_URL, ARTICLE_URL } from '../utils/constants';
import {
  Inject
} from '@angular/core';

@Injectable()
export class ArticlesActions {
  static ARTICLES_GET = 'ARTICLES_GET';
  static ARTICLES_DELETE = 'ARTICLES_DELETE';
  static ARTICLES_POST = 'ARTICLES_POST';
  static ARTICLES_PUT = 'ARTICLES_PUT';
  URL: string;

  constructor(private ngRedux: NgRedux<AppState>, private http: Http, private commonService: CommonService,
    @Inject(BASE_URL) private baseUrl: string, @Inject(ARTICLE_URL) private articleUrl: string) { 
    this.URL = `${this.baseUrl}${this.articleUrl}`;
  }
  
  getArticles() {
    this.http.get(
       this.URL,
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
      this.URL + id ,
      this.commonService.getHeaders()
    ).subscribe((res: Response) => {
      const list = res.json();
      this.ngRedux.dispatch({
        type: ArticlesActions.ARTICLES_DELETE,
        payload: { id }
      });
    });
  }

  createArticle(jsonArticle: any) {
    this.http.post(
      this.URL,
      JSON.stringify(jsonArticle),
       this.commonService.getHeaders()
    ).subscribe((res: Response) => {
      const article = res.json().article;
      this.ngRedux.dispatch({
        type: ArticlesActions.ARTICLES_POST,
        payload: { article }
      });
    },
    errorResponse => { 
      const error = errorResponse.json();
      alert(error.error_message);
    });
  }

  updateArticle(article: any) {
    this.http.put(
      this.URL + article.id ,
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
