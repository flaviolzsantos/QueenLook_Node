import { AdmAngularPage } from './app.po';

describe('adm-angular App', () => {
  let page: AdmAngularPage;

  beforeEach(() => {
    page = new AdmAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
