import {Page, ViewController,NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/modal/loginmodal.html'
})
export class LoginModal {
Centre : any;
  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.Centre = this.navParams.get('Centre');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
