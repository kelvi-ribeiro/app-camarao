import { TransparenciaService } from './../../services/domain/transparencia.service';
import { SalinidadeService } from './../../services/domain/salinidade.service';
import { OxigenioDissolvidoService } from './../../services/domain/oxigenioDissolvido.service';
import { NitritoService } from './../../services/domain/nitrito.service';
import { NitratoService } from './../../services/domain/nitrato.service';
import { AmoniaTotalService } from './../../services/domain/amoniaTotal.service';

import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { Globals } from '../../globals.array';
import { TemperaturaService } from '../../services/domain/temperatura.service';
import { PhService } from '../../services/domain/ph.service';


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storageService:StorageService,
              public usuarioService:UsuarioService,
              public global:Globals,
              public temperaturaService:TemperaturaService,
              public phService:PhService,
              public amoniaTotalService:AmoniaTotalService,
              public nitratoService:NitratoService,
              public nitritoService:NitritoService,
              public oxigenioDissolvidoService:OxigenioDissolvidoService,
              public salinidadeService:SalinidadeService,
              public transparenciaService:TransparenciaService
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
    this.exibirTemperaturaEmDezSegundos();
    this.exibirPhEmDezSegundos();
    this.exibirNitratoEmDezSegundos();
    this.exibirNitritoEmDezSegundos();
    this.exibirOxigenioDissolvidoEmDezSegundos();
    this.exibirSalinidadeEmDezSegundos();
    this.exibirTransparenciaEmDezSegundos();
    this.exibirAmoniaTotalEmDezSegundos();
  }

  ionViewDidEnter() {

  }

  ionViewWillLeave(){
    this.loopRecursivas=false;

  }

  exibirTemperaturaEmDezSegundos(){
    setTimeout(() => {
      this.temperaturaService.findTemperatura().subscribe(response=>{
        this.temperatura = response;
        if(this.loopRecursivas){
          this.exibirTemperaturaEmDezSegundos();
        }
      })
    }, 10000);
  }

  exibirPhEmDezSegundos(){
    setTimeout(() => {
      this.phService.findPhs().subscribe(response=>{
        this.ph = response;
        if(this.loopRecursivas){

          this.exibirPhEmDezSegundos();
        }
      })
    }, 10000);
  }
  exibirNitratoEmDezSegundos(){
    setTimeout(() => {
      this.nitratoService.findNitratos().subscribe(response=>{
        this.nitrato = response;
        if(this.loopRecursivas){

          this.exibirNitratoEmDezSegundos();
        }
      })
    }, 10000);
  }
  exibirNitritoEmDezSegundos(){
    setTimeout(() => {
      this.nitritoService.findNitrito().subscribe(response=>{
        this.nitrito = response;
        if(this.loopRecursivas){

          this.exibirNitritoEmDezSegundos();
        }
      })
    }, 10000);

  }

  exibirOxigenioDissolvidoEmDezSegundos(){
    setTimeout(() => {
      this.oxigenioDissolvidoService.findOxigenioDissolvido().subscribe(response=>{
        this.oxigenioDissolvido = response;
        if(this.loopRecursivas){

          this.exibirOxigenioDissolvidoEmDezSegundos();
        }
      })
    }, 10000);

  }

  exibirSalinidadeEmDezSegundos(){
    setTimeout(() => {
      this.salinidadeService.findSalinidade().subscribe(response=>{
        this.salinidade = response;
        if(this.loopRecursivas){

          this.exibirSalinidadeEmDezSegundos();
        }
      })
    }, 10000);

  }

  exibirTransparenciaEmDezSegundos(){
    setTimeout(() => {
      this.transparenciaService.findTransparencia().subscribe(response=>{
        this.transparencia = response;
        if(this.loopRecursivas){

          this.exibirTransparenciaEmDezSegundos();
        }
      })
    }, 10000);

  }

  exibirAmoniaTotalEmDezSegundos(){
    setTimeout(() => {
      this.amoniaTotalService.findAmonias().subscribe(response=>{
        this.amoniaTotal = response;
        if(this.loopRecursivas){

          this.exibirAmoniaTotalEmDezSegundos();
        }
      })
    }, 10000);

  }

}


