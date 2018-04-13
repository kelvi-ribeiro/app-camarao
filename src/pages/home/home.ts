import { Globals } from './../../globals.array';
import { TransparenciaService } from './../../services/domain/transparencia.service';
import { SalinidadeService } from './../../services/domain/salinidade.service';
import { OxigenioDissolvidoService } from './../../services/domain/oxigenioDissolvido.service';
import { NitritoService } from './../../services/domain/nitrito.service';
import { NitratoService } from './../../services/domain/nitrato.service';
import { AmoniaTotalService } from './../../services/domain/amoniaTotal.service';

import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { TemperaturaService } from '../../services/domain/temperatura.service';
import { PhService } from '../../services/domain/ph.service';
import { API_CONFIG } from '../../config/api.config';


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
  temperatura:any;
  ph;
  amoniaTotal;
  nitrato;
  nitrito;
  oxigenioDissolvido;
  salinidade;
  transparencia;
  loopRecursivas:boolean;
  tempo:number = 2000;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public storageService:StorageService,
              public usuarioService:UsuarioService,
              public temperaturaService:TemperaturaService,
              public phService:PhService,
              public amoniaTotalService:AmoniaTotalService,
              public nitratoService:NitratoService,
              public nitritoService:NitritoService,
              public oxigenioDissolvidoService:OxigenioDissolvidoService,
              public salinidadeService:SalinidadeService,
              public transparenciaService:TransparenciaService,
              public global:Globals
            ) {
    this.loopRecursivas = true;
    this.exibirTemperaturaEmCincoSegundos();
    this.exibirPhEmCincoSegundos();
    this.exibirNitratoEmCincoSegundos();
    this.exibirNitritoEmCincoSegundos();
    this.exibirOxigenioDissolvidoEmCincoSegundos();
    this.exibirSalinidadeEmCincoSegundos();
    this.exibirTransparenciaEmCincoSegundos();
    this.exibirAmoniaTotalEmCincoSegundos();
  }

  ionViewDidLoad() {
    this.presentLoadingDefault();
    this.preencherMenuDeAcordoComUsuario();
  }

  ionViewDidEnter() {

  }

  ionViewWillLeave(){
    this.loopRecursivas=false;

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    },this.tempo);
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
    .subscribe(response => {
      this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
    },
    error => {});
  }

  exibirTemperaturaEmCincoSegundos(){
    setTimeout(() => {
      this.temperaturaService.findTemperatura().subscribe(response=>{
        this.temperatura = response;
        if(this.loopRecursivas){
          this.exibirTemperaturaEmCincoSegundos();
        }
      })
    }, this.tempo);
  }

  exibirPhEmCincoSegundos(){
    setTimeout(() => {
      this.phService.findPhs().subscribe(response=>{
        this.ph = response;
        if(this.loopRecursivas){

          this.exibirPhEmCincoSegundos();
        }
      })
    }, this.tempo);
  }
  exibirNitratoEmCincoSegundos(){
    setTimeout(() => {
      this.nitratoService.findNitratos().subscribe(response=>{
        this.nitrato = response;
        if(this.loopRecursivas){

          this.exibirNitratoEmCincoSegundos();
        }
      })
    }, this.tempo);
  }
  exibirNitritoEmCincoSegundos(){
    setTimeout(() => {
      this.nitritoService.findNitrito().subscribe(response=>{
        this.nitrito = response;
        if(this.loopRecursivas){

          this.exibirNitritoEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirOxigenioDissolvidoEmCincoSegundos(){
    setTimeout(() => {
      this.oxigenioDissolvidoService.findOxigenioDissolvido().subscribe(response=>{
        this.oxigenioDissolvido = response;
        if(this.loopRecursivas){

          this.exibirOxigenioDissolvidoEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirSalinidadeEmCincoSegundos(){
    setTimeout(() => {
      this.salinidadeService.findSalinidade().subscribe(response=>{
        this.salinidade = response;
        if(this.loopRecursivas){

          this.exibirSalinidadeEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirTransparenciaEmCincoSegundos(){
    setTimeout(() => {
      this.transparenciaService.findTransparencia().subscribe(response=>{
        this.transparencia = response;
        if(this.loopRecursivas){

          this.exibirTransparenciaEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirAmoniaTotalEmCincoSegundos(){
    setTimeout(() => {
      this.amoniaTotalService.findAmonias().subscribe(response=>{
        this.amoniaTotal = response;
        if(this.loopRecursivas){

          this.exibirAmoniaTotalEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  preencherMenuDeAcordoComUsuario(){
    console.log('Chegou aqui');

    this.email = this.storageService.getLocalUser().email;
    this.usuarioService.findByEmail(this.email)
    .subscribe((response=>{
      console.log(response);

      this.perfis = response['perfis'];
      this.storageService.setUserPerfil(this.perfis)
      for(let i = 0; i<this.perfis.length;i++){
        let perfil = this.perfis[i];
        if(perfil==='ADMIN'){
          this.global.pages  = [
            {title:'Home',component:'HomePage'},
            { title: 'Meu Perfil', component: 'ProfilePage' },
            {title:'Meus Funcionarios',component:'FuncionariosPage'},
            {title:'Gráficos',component:'GraficosPage'},
            {title:'Cadastrar Novo Funcionário',component:'SignupPage'},
            {title:'Logout',component:''}
          ];
          break;
        }else{
          this.global.pages  = [
            {title:'Home',component:'HomePage'},
            { title: 'Meu Perfil', component: 'ProfilePage' },
            {title:'Gráficos',component:'GraficosPage'},
            {title:'Logout',component:''}
          ];
        }
      }




    }))

  }

}
