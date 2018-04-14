import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;

  constructor(public navCtrl: NavController, private usersProvider: UsersProvider) {}

  ionViewDidLoad() {
    this.usersProvider.getAll().subscribe(({data}) => (this.users = data))
  }
}


