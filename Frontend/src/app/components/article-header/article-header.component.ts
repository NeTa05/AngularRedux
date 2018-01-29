import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
