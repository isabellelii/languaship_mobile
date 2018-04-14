import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Angular2TokenService} from 'angular2-token';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {

  constructor(private http: Http, private _tokenService: Angular2TokenService) {
  }

  getAll() {
    return this._tokenService.get('user').map(users => users.json());
  }
}
