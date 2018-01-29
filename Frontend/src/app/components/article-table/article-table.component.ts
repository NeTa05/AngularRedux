import { Component, OnInit, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticlesActions } from '../../actions/articles.actions';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html'
})
export class ArticleTableComponent {

	@select() public articles: Observable<Article>;

	constructor(public articlesActions:  ArticlesActions, private _bsModalService: BsModalService) {  
		articlesActions.getArticles();
	}

	editStore(store: any){
    	const modal = this._bsModalService.show(ArticleModalComponent);
		(<ArticleModalComponent>modal.content).showModal(
		    'Edit article',
		    'Body text',
		    store
		);
		(<ArticleModalComponent>modal.content).onClose.subscribe(result => {
		    if (result.submit) {
		    	result.store.id = store.id;
      			this.articlesActions.updateArticle(result.store);
		    } 
		});
  	}

}
