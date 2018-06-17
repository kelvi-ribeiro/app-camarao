import { TransparenciaService } from './../../services/domain/transparencia.service';
import { SalinidadeService } from './../../services/domain/salinidade.service';
import { OxigenioDissolvidoService } from './../../services/domain/oxigenioDissolvido.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PhService } from '../../services/domain/ph.service';
import { AmoniaTotalService } from '../../services/domain/amoniaTotal.service';
import { NitritoService } from '../../services/domain/nitrito.service';
import { NitratoService } from '../../services/domain/nitrato.service';

/**
 * Generated class for the RelatorioCompletoPropriedadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorio-completo-propriedades',
  templateUrl: 'relatorio-completo-propriedades.html',
})
export class RelatorioCompletoPropriedadesPage {
  urlPath: string;
  page = 0;
  propriedades;
  objectMockListaPropriedades;
  tanque;
  propriedadeEscolhida;
  loading;
  tanqueInexistente = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public amoniaService:AmoniaTotalService,
    public nitratoService:NitratoService,
    public nitritoService:NitritoService,
    public oxigenioService:OxigenioDissolvidoService,
    public phService:PhService,
    public salinidadeService:SalinidadeService,
    public temperaturaSevice:SalinidadeService,
    public transparenciaService:TransparenciaService,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController

  ) {    this.tanque = this.navParams.get('tanque');

  }

  ionViewDidLoad() {
    if(this.tanque){
      if(this.tanque.nome!=='Macuxi'){
      this.presentAlert('Sem Arduíno para essse tanque!','Redirecionando para a tela principal...')
      this.tanqueInexistente = true;
    }else{
      this.tanqueInexistente ? null:this.alertEscolhaPropriedadeRelatorio()
    }
  }else{
    this.presentAlert('Sem tanque selecionado','Redirecionando para a tela principal...')
  }

  }
  pesquisaPropriedade(){
    console.log(this.urlPath)
    switch (this.urlPath){
      case "amonias":
      this.loading = this.presentLoadingDefault()
      this.amoniaService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content']
        this.loading.dismiss()
      },error=>{this.loading.dismiss()})
      break;
      case "nitratos":
      this.loading = this.presentLoadingDefault()
      this.nitratoService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
        this.loading.dismiss()
      },error=>{this.loading.dismiss()})
      break;
      case "nitritos":
      this.loading = this.presentLoadingDefault()
      this.nitritoService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
        this.loading.dismiss()
      },error=>{this.loading.dismiss()})
      break;
      case "oxigenioDissolvidos":
      this.loading = this.presentLoadingDefault()
      this.oxigenioService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
        this.loading.dismiss()
      },error=>{this.loading.dismiss()})
      break;
      case "phs":
      this.loading = this.presentLoadingDefault()
      this.phService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
        this.loading.dismiss()
      },error=>{this.loading.dismiss()})
      break;
      case "salinidades":
      this.loading = this.presentLoadingDefault()
      this.salinidadeService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
        this.loading.dismiss()
      },error=>{this.loading.dismiss()})
      break;
      case "temperaturas":
      this.loading = this.presentLoadingDefault()
      this.temperaturaSevice.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
        this.loading.dismiss()
      },error=>{this.loading.dismiss()})
      break;
      case "transparencias":
      this.loading = this.presentLoadingDefault()
      this.transparenciaService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
        this.loading.dismiss()

      },error=>{this.loading.dismiss()})
      break;
      default:null
    }
  }

  criarObjetoNomePropriedades(){
    const propriedades = [
      {
        urlPath:'amonias',
        nomePropriedade:'Amonia Total'
      },
      {
        urlPath:'nitratos',
        nomePropriedade:'Nitrato'
      },
      {
        urlPath:'nitritos',
        nomePropriedade:'Nitrito'
      },
      {
        urlPath:'salinidades',
        nomePropriedade:'Salinidade'
      },

      {
        urlPath:'oxigenioDissolvidos',
        nomePropriedade:'Oxigênio Dissolvido'
      },

      {
        urlPath:'temperaturas',
        nomePropriedade:'Temperatura'
      },

      {
        urlPath:'transparencias',
        nomePropriedade:'Transparência'
      }]
      return propriedades
  }
  alertEscolhaPropriedadeRelatorio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Escolha uma propriedade')
    this.objectMockListaPropriedades = this.criarObjetoNomePropriedades()
    this.objectMockListaPropriedades.forEach(element => {
      alert.addButton({
        text: element.nomePropriedade,
        handler: data => {
          this.urlPath = element.urlPath
          this.propriedadeEscolhida = element
          console.log('this.propriedadeEscolhida',this.propriedadeEscolhida)
          this.pesquisaPropriedade()
        }
      });
    });
    alert.present()
  }
  transformaPropriedade(res){
    return Object.keys(res).map(e => res[e])[1]

  }
  doInfinite(infiniteScroll) {
    this.page++;
    this.pesquisaPropriedade();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 3000);
  }
  presentAlert(title,message) {
    let alert = this.alertCtrl.create({
      title:title,
      message: message
    });

    alert.present();
    setTimeout(() => {
      alert.dismiss()
      this.navCtrl.setRoot('HomePage')
    }, 3500);
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    return loading;
  }
  escolherPropriedade(propriedade){
    console.log(propriedade)
    this.urlPath = propriedade.urlPath
    this.propriedadeEscolhida = propriedade
    this.pesquisaPropriedade()
  }

}
