import {Page, NavController, NavParams} from 'ionic-angular';
import { Centre } from '../../providers/centre/centre';
import { Page1 } from '../page1/page1';
import {SignupPage} from '../signup/signup';


@Page({
  templateUrl: 'build/pages/login/login.html',
    providers: [Centre]
})
export class LoginPage {
  
    

    nav :any;
    usercreds: any;
    constructor(private navCtrl: NavController,private navParams: NavParams, private myservice : Centre) {
       
        this.nav = navCtrl;
        this.usercreds = {
            name: null,
            password: null
                    };
    }
    
    login(usercreds) {
        this.myservice.userLogin(usercreds).then(data => {
            if(data)
                this.nav.push(Page1);
        })
    }
    register(){
        this.nav.push(SignupPage);
    }
}