import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';

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
              public alertCtrl:AlertController,
              public usuarioService:UsuarioService) {
  }

  ionViewDidLoad() {
    this.obterMensagens()
  }

  obterMensagens(){
    this.mensagemService.findAll().subscribe((mensagens)=>{
      this.mensagens = mensagens;
      this.mensagens.forEach(mensagem => {
        mensagem = this.getImageIfExists(mensagem);
      });
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
  //  buscarFuncionarios(){
  //   this.usuarioService.findAll().subscribe((response => {

  //     this.funcionarios = response;
  //     this.funcionarios.forEach(funcionario => {
  //       funcionario = this.getImageIfExists(funcionario);
  //     });
  //   }), error => {

  //   })
  // }
  getImageIfExists(mensagem) {
    this.usuarioService.getImageFromBucket(mensagem['clienteId'])
      .subscribe(response => {
        mensagem.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${mensagem['clienteId']}.jpg`;
        return mensagem;
      },
        error => { });
  }

  }



