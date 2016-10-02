import { Component,provide,ViewChild ,Injectable, Inject } from '@angular/core';
import { NavController,ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import { Page3Page } from './pages/page-3/page-3';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {ProfilePage} from './pages/profile/profile';
import {LoginModal} from './pages/modal/loginmodal';
import {Optionsuno} from './pages/optionsuno/optionsuno';

import {Centre} from './providers/centre/centre';
import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth/auth';

ionicBootstrap({
  menuType: 'overlay',

});
@Component({
  templateUrl: 'build/app.html',

})
class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, private auth: AuthService) {
    platform.ready().then(() => {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Page1 },
      { title: 'Test', component: Page2 },
      { title: 'Profile', component: ProfilePage },
      { title: 'Login', component: LoginPage },
     
    ];
    this.auth.startupTokenRefresh();
        });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {


      this.nav.setRoot(page.component);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

  }
  openPro() {


      this.nav.setRoot(ProfilePage);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

  }


}

ionicBootstrap(MyApp, [
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  AuthService
])
