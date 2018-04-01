import { PhService } from './../../services/domain/phService';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { Globals } from '../../globals.array';
import { TemperaturaService } from '../../services/domain/temperaturaService';

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
  temperatura = 0;
  ph = 0;
  loopRecursivas:boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storageService:StorageService,
              public usuarioService:UsuarioService,
              public global:Globals,
              public temperaturaService:TemperaturaService,
              public phService:PhService
            ) {
                this.email = this.storageService.getLocalUser().email;
    this.usuarioService.findByEmail(this.email)
    .subscribe((response=>{
      this.perfis = response['perfis'];
      this.storageService.setUserPerfil(this.perfis)
      this.perfis.forEach((perfil=>{


        if(perfil==='ADMIN'){

          this.global.pages  = [
            {title:'Home',component:'HomePage'},
            { title: 'Meu Perfil', component: 'ProfilePage' },
            {title:'Meus Funcionarios',component:'FuncionariosPage'},
            {title:'Cadastrar Novo Funcionário',component:'SignupPage'},
            {title:'Logout',component:''}
          ];

        }
      }));

      this.usuario = response['nome']
    }))
    this.loopRecursivas = true;
    this.exibirTemperaturaEmCincoSegundos();
    this.exibirPhEmCincoSegundos();
  }

  ionViewDidEnter() {

  }

  ionViewWillLeave(){
    this.loopRecursivas=false;

  }

  exibirTemperaturaEmCincoSegundos(){
    setTimeout(() => {
      this.temperaturaService.findTemperatura().subscribe(response=>{
        this.temperatura = response;
        if(this.loopRecursivas){
          this.exibirTemperaturaEmCincoSegundos();
        }
      })
    }, 5000);
  }

  exibirPhEmCincoSegundos(){
    setTimeout(() => {
      this.phService.findPhs().subscribe(response=>{
        this.ph = response;
        if(this.loopRecursivas){

          this.exibirPhEmCincoSegundos();
        }
      })
    }, 5000);
  }

}


