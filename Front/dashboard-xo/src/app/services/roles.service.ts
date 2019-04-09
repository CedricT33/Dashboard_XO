import { Injectable } from '@angular/core';
import { DatasService } from './datas.service';
import { Role } from '../models/role.model';
import { HttpClient } from '@angular/common/http';
import { RoleSerializer } from '../serializers/role.serializer';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends DatasService<Role> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'role', new RoleSerializer());
  }
}
