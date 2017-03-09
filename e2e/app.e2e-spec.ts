import { SistemasInformacionPage } from './app.po';

describe('sistemas-informacion App', () => {
  let page: SistemasInformacionPage;

  beforeEach(() => {
    page = new SistemasInformacionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
