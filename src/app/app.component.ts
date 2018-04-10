import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { SettingsPage } from '../pages/settings/settings';
import { Angular2TokenService } from 'angular2-token';
import { AlertController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  currentUser: any;
  pages: Array<{title: string, component: any}>;


  constructor(
    public platform:
    Platform, public statusBar:
    StatusBar, public splashScreen:
    SplashScreen,
    private _tokenService: Angular2TokenService,
    private alertCtrl: AlertController
  ) {

    this._tokenService.init({
      apiBase: 'https://languaship.herokuapp.com/api/v1'
  });

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Signup', component: SignupPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Chat', component: ChatPage },
      { title: 'Settings', component: SettingsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  registerAccountPopUp(){
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Signup',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        },
        {
          name: 'passwordConformation',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Signup',
          handler: data => {
            this.register(data);
            // this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({

      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  register(credentials) {
    this._tokenService
      .registerAccount(credentials)
      .subscribe(
        res => console.log(res),
        err => console.error('error')
      );
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
      );
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
  }
}
