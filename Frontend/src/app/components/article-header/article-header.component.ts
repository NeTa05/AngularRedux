import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { ArticlesActions } from '../../actions/articles.actions';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styles: [
	`.logo {
		width: 75px;
    	float: left;
    	margin-right: 15px;
		}
    `]
})
export class ArticleHeaderComponent implements OnInit {

  constructor(private _bsModalService: BsModalService, public articlesActions:  ArticlesActions) { }

  ngOnInit() {
  }

  addArticle(){
    const modal = this._bsModalService.show(ArticleModalComponent);
    (<ArticleModalComponent>modal.content).showModal('Add article');
    (<ArticleModalComponent>modal.content).onClose.subscribe(result => {
        if (result.submit) {
          this.articlesActions.createArticle(result.article);
        }
    });
  }

}
