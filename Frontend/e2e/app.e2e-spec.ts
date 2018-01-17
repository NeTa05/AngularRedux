import { AngularSuperZapatosPage } from './app.po';

describe('angular-super-zapatos App', () => {
  let page: AngularSuperZapatosPage;

  beforeEach(() => {
    page = new AngularSuperZapatosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
