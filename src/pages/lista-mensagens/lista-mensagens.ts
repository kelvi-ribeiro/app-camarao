import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';

/**
 * Generated class for the ListaMensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-mensagens',
  templateUrl: 'lista-mensagens.html',
})
export class ListaMensagensPage {
  mensagens;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mensagemService:MensagemService,
              public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    this.obterMensagens()
  }

  obterMensagens(){
    this.mensagemService.findAll().subscribe((mensagens)=>{
      this.mensagens = mensagens;
    })
  }

  alertApagarTodos(){
    let alert = this.alertCtrl.create({
      title:'Atenção!',
      message:'Esta ação vai apagar todas as mensagens',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Sim',
          handler:() =>{
            this.apagarTodos()
          }

        },
        {
          text:'Não'
        }

      ]
    });
    alert.present();
   }
   apagarTodos(){
     this.mensagemService.deleteAll().subscribe(res=>{
       this.obterMensagens()
     })
   }
  }



