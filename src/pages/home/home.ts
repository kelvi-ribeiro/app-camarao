import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  email;
  usuario

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storageService:StorageService,
              public usuarioService:UsuarioService) {
  }

  ionViewDidLoad() {
    this.email = this.storageService.getLocalUser().email;
    this.usuarioService.findByEmail(this.email)
    .subscribe((response=>{
      this.usuario = response['nome']
    }))
  }

}
