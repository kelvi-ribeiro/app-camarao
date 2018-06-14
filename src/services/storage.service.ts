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

  getUserPerfil() {
    let perfil = localStorage.getItem(STORAGE_KEYS.perfil);
    if (perfil == null) {
      return null;
    } else {
      return JSON.parse(perfil);
    }
  }

  setUserPerfil(perfil) {
    if(perfil == null){
      localStorage.removeItem(STORAGE_KEYS.perfil);
    }else{
      localStorage.setItem(STORAGE_KEYS.perfil,JSON.stringify(perfil))
    }
  }
  getUserName() {
    let nome = localStorage.getItem(STORAGE_KEYS.nome);
    if (nome == null) {
      return null;
    } else {
      return JSON.parse(nome);
    }
  }

  setUserName(nome) {
    if(nome == null){
      localStorage.removeItem(STORAGE_KEYS.nome);
    }else{
      localStorage.setItem(STORAGE_KEYS.nome,JSON.stringify(nome))
    }
  }


  setEmail(email) {
    if(email == null){
      localStorage.removeItem(STORAGE_KEYS.email);
    }else{
      localStorage.setItem(STORAGE_KEYS.email,JSON.stringify(email))
    }

  }

  getEmail() {
    let email = localStorage.getItem(STORAGE_KEYS.email);
    if (email == null) {
      return "";
    } else {
      return JSON.parse(email);
    }
  }
}
