import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { SettingsPage } from '../pages/settings/settings';
import { Angular2TokenService } from 'angular2-token';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import ENV from '../providers/config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignupPage;
  currentUser: any;
  loader: any;
  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    private _tokenService: Angular2TokenService,
    private alertCtrl: AlertController,
    private event: Events
  ) {
    this._tokenService.init({
      apiBase: ENV.config('dev').apiBase
    });

    this.event.subscribe('userSignedUp', user => {
      this.currentUser = user;
    });

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
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

  showPage(page) {
    this.nav.setRoot(page.component);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loader.present();
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

  login(credentials) {
    this._tokenService.signIn(credentials).subscribe(
      res => {
        this.currentUser = res.json().data;
        let alert = this.alertCtrl.create({
          title: 'Successful Login',
          buttons: ['OK']
        });
        alert.present();
      },
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
