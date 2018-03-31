import { StorageService } from './../../services/storage.service';
import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

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
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              public storageService:StorageService
              ) {
  }

  ionViewDidLoad() {
    this.emailUsuarioLogado = this.storageService.getLocalUser().email
    this.usuarioService.findAll().subscribe((response=>{
      this.funcionarios = response;
      let position = this.funcionarios.findIndex(funcionario=> funcionario.email === this.emailUsuarioLogado );
      if(position!=-1){
        this.funcionarios.splice(position,1)
      }
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
