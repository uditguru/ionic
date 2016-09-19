import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Page3Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/page-3/page-3.html',
})
export class Page3Page {
	c: any;

  constructor(private navCtrl: NavController,navParams: NavParams) {
    this.c = navParams.get('c');
  }

}
