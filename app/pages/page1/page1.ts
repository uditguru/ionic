import {Component, ViewChild, ElementRef} from '@angular/core';
import {  Page, NavController, NavParams, LoadingController, AlertController,ModalController, ViewController, Platform} from 'ionic-angular';
import { Centre } from '../../providers/centre/centre';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,Geolocation} from 'ionic-native';
import {AuthService} from '../../services/auth/auth';
import {Http} from '@angular/http';

import { Page2 } from '../page2/page2';
import { LoginModal } from '../modal/loginmodal';
import { Optionsuno } from '../optionsuno/optionsuno';


declare var google;

@Component({
  templateUrl: 'build/pages/page1/page1.html',
  providers : [Centre]
})
export class Page1 {
data: any;
type: any;
address: any;
servicecost: any;
@ViewChild('map') mapElement: ElementRef;
map: GoogleMap;
marker: any;
geocoder : any;
  constructor(public navCtrl: NavController, private http: Http , public modalCtrl: ModalController,
              private auth: AuthService ,
              private Servicecentre: Centre,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private platform: Platform,
              public navParams: NavParams) {
    platform.ready().then(() => {
            this.loadMap();
        });
        this.geocoder = null;
        this.data = "Getting";
       }

ionViewLoaded(){
    this.loadMap();
    this.map.setPadding(0,0,200,0);

  }

  loadMap(){
    let me = this;
    let options = {timeout: 10000, enableHighAccuracy: true};
    Geolocation.getCurrentPosition(options).then((position) => {
console.log(position);
let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
this.geocoder = new google.maps.Geocoder();
this.geocoder.geocode( { 'location': latlng}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {

me.data = results[0].formatted_address;
 console.log(results[0].formatted_address);

} else {
 me.data = "Cannot Get";
}

});

        let location = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);

        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
           'center' : latlng ,
          'controls': {
            'compass': false,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': false,
            'rotate': false,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 0,
            'zoom': 15,

          }
        });



        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {

            console.log('Map is ready!');
        });

    }, (err) => {
      console.log(err);
    });




  //  if(!this.auth.user){
  //        this.auth.lock.show();
  //      }
    }


presentContactModal() {
  let loading = this.loadingCtrl.create({
            content: "Loading..."
        });

        loading.present();
  this.Servicecentre.getCentre().then((data) => {
    loading.dismiss().then( () => {

      let loginModal = this.modalCtrl.create(LoginModal, {
          Centre: data,


      });


    loginModal.present();
});

 console.log(data);


        }, (err) => {
          console.log(err);
        });
}

findCentre(){
  let loading = this.loadingCtrl.create({
            content: "Loading..."
        });

        loading.present();

        let options = {
            type: "Car Wash" ,
            address: "95 Adarsh Gram",
            servicecost: "Rs 250",

        };

  this.Servicecentre.getCentre().then((data) => {

            loading.dismiss().then( () => { if(typeof(data[0]) === "undefined"){
                let alert = this.alertCtrl.create({
                    title: 'Oops!',
                    subTitle: 'Cannot find',
                    buttons: ['Ok']
                });

                alert.present();

            } else {
                this.navCtrl.push(Page2, {
                    Centre: data,
                    details: options,

                });
            }
          });
 console.log(data);


        }, (err) => {
            console.log(err);
        });


}



}
