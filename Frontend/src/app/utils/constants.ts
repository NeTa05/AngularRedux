
export const BASE_URL = 'http://localhost:8000/services/';
export const ARTICLE_URL = 'articles/';
export const STORE_URL = 'stores/';

export const Constants: Array<any> = [
	{ provide: BASE_URL, useValue: BASE_URL },
	{ provide: ARTICLE_URL, useValue: ARTICLE_URL },
	{ provide: STORE_URL, useValue: STORE_URL },
];
