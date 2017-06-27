import { Component } from '@angular/core';
import { AppBase } from '../../app/app.base';
import { AppLang } from '../../app/app.lang';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MemberPage } from '../member/member';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage extends AppBase {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = MemberPage;

  constructor() {
      super();
      AppLang.init();
  }
}
