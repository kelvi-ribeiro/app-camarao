import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public mensagemService:MensagemService) {
  }

  ionViewDidLoad() {
    this.mensagemService.findAll().subscribe((mensagens)=>{
      this.mensagens = mensagens;
    })
  }


}
