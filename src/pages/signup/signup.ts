import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Nav, Events, Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { HomePage } from '../home/home'


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Slides) slides: Slides;

  locations: any;
  languages: any;
  learnings: any;
  nativeLanguage: any;
  learnLanguage: any;
  pages: Array<{title: string, component: any}>;
  currentUser: any;
  age: any;

  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _tokenService: Angular2TokenService,
    private alertCtrl: AlertController,
    private event: Events
  ) {
      this.age = 20;
      this.locations = [
              'STOCKHOLM',
              'GOTHENBURG',
              'MALMO',
              'ZURICH',
              'ROME',
              'AMSTERDAM'
        ];

      this.languages = [
            'ENGLISH',
            'SPANISH',
            'ITALIAN',
            'DUTCH',
            'SWEDISH',
            'FRENCH'
      ];

      this.learnings = [
            'ENGLISH',
            'SPANISH',
            'ITALIAN',
            'DUTCH',
            'SWEDISH',
            'FRENCH'
      ]
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  showPage(page) {
    this.nav.setRoot(page.component);
  }

  showAlert() {
  let alert = this.alertCtrl.create({
    title: 'Hooray!',
    subTitle: 'Successful action',
    buttons: ['Ok']
  });
    alert.present();
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
        res => {
          (this.currentUser = res.json().data)
          this.showAlert();
          this.event.publish('userSignedUp', this.currentUser);
          this.slides.slideTo(1, 500);        },
        err => console.error('error')
      );
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
    this._tokenService
      .signIn(credentials)
      .subscribe(
        res => {
          this.currentUser = res.json().data,
          this.showAlert();
          this.event.publish('userSignedUp', this.currentUser);
          this.goToHome();
        },
          err => console.error('error')
      );
  }

  goToHome() {
    if (this.currentUser){
      this.navCtrl.setRoot(HomePage);
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Log in please',
        subTitle: 'You need to be logged in!',
        buttons: ['Ok']
      });
        alert.present();
    }
  }

  goToSlide(n) {
    this.slides.slideTo(n, 500);
  }
}
