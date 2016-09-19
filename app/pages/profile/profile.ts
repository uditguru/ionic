
import {Page} from 'ionic-angular';
import {AuthService} from '../../services/auth/auth';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
 data: any;

  // We need to inject AuthService so that we can
  // use it in the view
  constructor(private http: Http, private auth: AuthService) {

  }

  ionViewLoaded(){
    if(!this.auth.user){
      this.auth.lock.show();
    }
    var url = 'https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=v7hpdubbmpxud3wrgts9m2yu';
    var response = this.http.get(url).map(res => res.json())
    .subscribe(data => {
      this.data = data.makes;

      console.log(data);
    });

    return response;

  }
}
