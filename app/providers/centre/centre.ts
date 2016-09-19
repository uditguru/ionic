import {NavController,NavParams} from 'ionic-angular';
import {Component,Injectable, Inject} from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Centre provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Centre {
   static get parameters() {
        return [[Http],[NavController]];
    }
    
data : any;
nav : any;
isLoggedin : any;

  constructor(private http: Http,private navCtrl: NavController,private navParams: NavParams) {
  	this.data = null;
      
        this.http = http;
        this.nav = NavController;
        this.isLoggedin = false;
  }

 getCentre(){
 
 if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
  let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      this.http.get('http://localhost:8080/api/centre')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
   getUser(){
 
 if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
  let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      this.http.get('http://localhost:8080/api/user')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
 
  requestCentre(data){
 
    return new Promise(resolve => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      this.http.post('http://localhost:8080/api/centre/request', JSON.stringify(data), {headers: headers})
        .subscribe((data) => {
          resolve(data);
        });
 
    });
 
  }

   userLogin(user) {
        var headers = new Headers();
        var creds = "name=" + user.name + "&password=" + user.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
        
            this.http.post('http://localhost:8080/authenticate', creds, {headers: headers}).subscribe(data => {
            
            if(data.json().success){
                window.localStorage.setItem('dashboard', data.json().token);
            this.isLoggedin = true; }   
            resolve(this.isLoggedin);
                
        }); 
            
        });
        
        
    }
    register(user) {
        
        return new Promise(resolve => {
        var creds = "name=" + user.name + "&password=" + user.password;
      
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost:8080/adduser', creds, {headers: headers}).subscribe(data => {
           if(data.json().success)
               resolve(true);
            else
                resolve(false);
    
        });    
        });
        
    }
    
    logout() {
        this.isLoggedin = false;
        window.localStorage.clear();
    }

}

