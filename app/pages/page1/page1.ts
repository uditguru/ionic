import {Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, LoadingController, AlertController,ModalController, ViewController} from 'ionic-angular';
import { Centre } from '../../providers/centre/centre';
import {Geolocation} from 'ionic-native';
import {AuthService} from '../../services/auth/auth';

import { Page2 } from '../page2/page2';
import { LoginModal } from '../modal/loginmodal';

declare var google;

@Component({
  templateUrl: 'build/pages/page1/page1.html',
  providers : [Centre]
})
export class Page1 {

type: any;
address:any;
servicecost: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private auth: AuthService , private Servicecentre: Centre, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      this.type = "Car Wash";
        this.address = "95 Adarsh Gram";
        this.servicecost = "Rs 250";

       }

ionViewLoaded(){
    this.loadMap();
    if(!this.auth.user){
      this.auth.lock.show();
    }
  }

  loadMap(){

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }
  addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });

  let content = "<h4>Information!</h4>";

  this.addInfoWindow(marker, content);

}
addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

presentContactModal() {

  this.Servicecentre.getCentre().then((data) => {

    let loginModal = this.modalCtrl.create(LoginModal, {
        Centre: data,


    });
    loginModal.present();


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
                    subTitle: 'Sorry, no rooms could be found for your search criteria.',
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
