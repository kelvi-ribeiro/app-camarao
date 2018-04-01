import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { LoginPage } from '../login/login';

/**
 * Generated class for the FuncionariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-funcionarios',
  templateUrl: 'funcionarios.html',
})
export class FuncionariosPage {
  funcionarios;
  emailUsuarioLogado;
  perfis = []
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              public storageService:StorageService,
              public authService:AuthService
              ) {

  }

  ionViewCanEnter(){
    this.perfis = this.storageService.getUserPerfil();
    for(let i = 0;i<this.perfis.length;i++){

      let perfil = this.perfis[i];
      if(perfil==='ADMIN'){
        return true;
        break;
      }else{
        this.navCtrl.setRoot('HomePage');
        return false;

      }
    }

    }


  ionViewDidLoad() {
    this.emailUsuarioLogado = this.storageService.getLocalUser().email
    this.usuarioService.findAll().subscribe((response=>{

      this.funcionarios = response;
      let position = this.funcionarios.findIndex(funcionario=> funcionario.email === this.emailUsuarioLogado );
      if(position!=-1){
        this.funcionarios.splice(position,1)
      }
      console.log(this.funcionarios);

      this.funcionarios.forEach(funcionario => {

          funcionario = this.getImageIfExists(funcionario);


      });

    }),error=>{

    })
  }

  getImageIfExists(funcionario) {
    this.usuarioService.getImageFromBucket(funcionario.id)
    .subscribe(response => {
      funcionario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${funcionario.id}.jpg`;
      return funcionario;
    },
    error => {});
  }

}
