import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { Centre } from '../../providers/centre/centre';

import { Page3Page } from '../page-3/page-3';

@Component({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  Centre: any;

 

  constructor(private nav: NavController, private navParams: NavParams) {
        this.Centre = this.navParams.get('Centre');
    }
 
    detail(c){
        this.nav.push(Page3Page, {
            c: c,
            
        });
    }
}