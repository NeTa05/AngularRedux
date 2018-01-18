import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: '/header.component.html',
  styles: [
	`.logo {
		width: 75px;
    	float: left;
    	margin-right: 15px;
		}
    `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
