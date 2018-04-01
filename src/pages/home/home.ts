import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { Globals } from '../../globals.array';

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
  usuario;
  perfis = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storageService:StorageService,
              public usuarioService:UsuarioService,
              public global:Globals) {
                this.email = this.storageService.getLocalUser().email;
    this.usuarioService.findByEmail(this.email)
    .subscribe((response=>{
      this.perfis = response['perfis'];
      this.perfis.forEach((perfil=>{


        console.log('see',perfil)
        if(perfil==='ADMIN'){
          console.log('chegou aqui');

          this.global.pages  = [
            {title:'Home',component:'HomePage'},
            { title: 'Meu Perfil', component: 'ProfilePage' },
            {title:'Meus Funcionarios',component:'FuncionariosPage'},
            {title:'Logout',component:''}
          ];

        }
      }));

      this.usuario = response['nome']
    }))
  }

  ionViewDidEnter() {

  }

}


