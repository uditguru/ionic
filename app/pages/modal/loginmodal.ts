import {Page, ViewController,NavParams, ModalController} from 'ionic-angular';
import { Optionsuno } from '../optionsuno/optionsuno';

@Page({
  templateUrl: 'build/pages/modal/loginmodal.html'
})
export class LoginModal {
Centre : any;
  constructor(private viewCtrl: ViewController, private navParams: NavParams, public modalCtrl: ModalController) {
    this.Centre = this.navParams.get('Centre');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  openselect(){
    let select = this.modalCtrl.create(Optionsuno,{
      Centre : this.Centre,
    });


  select.present();
  }
}
