import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';
@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(usr: LocalUser) {
    if(usr == null){
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }else{
      localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(usr))
    }

  }
}
