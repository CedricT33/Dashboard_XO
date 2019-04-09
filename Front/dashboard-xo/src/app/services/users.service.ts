import { Injectable } from '@angular/core';
import { DatasService } from './datas.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserSerializer } from '../serializers/user.serializer';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DatasService<User> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'user', new UserSerializer());
  }
}
