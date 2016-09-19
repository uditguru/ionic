import {Page, NavController, NavParams ,Alert} from 'ionic-angular';
import { Centre } from '../../providers/centre/centre';
import {LoginPage} from '../login/login';


@Page({
  templateUrl: 'build/pages/signup/signup.html',
    providers: [Centre]
})
export class SignupPage {
  
    
    nav :any;
    newcreds: any;
    constructor(private navCtrl: NavController,private navParams: NavParams, private myservice: Centre) {
        this.nav = navCtrl;
        this.newcreds = {
            name: '',
            password: ''
        }
    }
    
    register(newcreds) {
        this.myservice.register(newcreds).then(data => {
            if(data){
                this.nav.setRoot(LoginPage);
            }
                
        })
    }
}LoginPage