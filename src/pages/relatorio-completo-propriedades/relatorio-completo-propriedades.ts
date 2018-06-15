import { TransparenciaService } from './../../services/domain/transparencia.service';
import { SalinidadeService } from './../../services/domain/salinidade.service';
import { OxigenioDissolvidoService } from './../../services/domain/oxigenioDissolvido.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
    public alertCtrl:AlertController

  ) {
  }

  ionViewDidLoad() {
    console.log('chegou aqui')
    this.alertEscolhaPropriedadeRelatorio()
    this.tanque = this.navParams.get('tanque');

  }
  incrementaPage(){
    this.page++;
    this.pesquisaPropriedade()
  }
  pesquisaPropriedade(){
    console.log('pesquisaPropriedade',this.urlPath)
    switch (this.urlPath){
      case "amonias":
      this.amoniaService.findPage(this.page,this.urlPath).subscribe(res=>{
        console.log('objectMockListaProprieades',this.objectMockListaPropriedades)
        this.propriedades = res['content']


      })
      break;
      case "nitratos":
      this.nitratoService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
      })
      break;
      case "nitritos":
      this.nitritoService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
      })
      break;
      case "oxigenioDissolvidos":
      this.oxigenioService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
      })
      break;
      case "phs":
      this.phService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
      })
      break;
      case "salinidades":
      this.salinidadeService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
      })
      break;
      case "temperaturas":
      this.temperaturaSevice.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
      })
      break;
      case "transparencias":
      this.transparenciaService.findPage(this.page,this.urlPath).subscribe(res=>{
        this.propriedades = res['content'];
      })

      break;
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
          this.propriedadeEscolhida = element.nomePropriedade
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
    }, 2000);
  }

}
