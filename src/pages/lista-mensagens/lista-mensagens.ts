import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { Globals } from '../../globals.array';

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
  admin = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mensagemService:MensagemService,
              public alertCtrl:AlertController,
              public usuarioService:UsuarioService,
              public modalCtrl:ModalController,
              public globals:Globals) {
  }

  ionViewDidLoad() {
    this.obterMensagens()
    this.verificaUsuarioAdmin()
  }

  verificaUsuarioAdmin(){
    console.log(this.globals.perfis);

    if(this.globals.perfis.find( e => e =='ADMIN')){
      this.admin = true
    }
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
      message:'Esta ação vai apagar todas as mensagens, deseja mesmo fazer isso ?',
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

   alertApagarMensagem(id){
    let alert = this.alertCtrl.create({
      title:'Atenção!',
      message:'Deseja mesmo apagar essa mensagem ?',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Sim',
          handler:() =>{
            this.apagarMensagem(id)
          }

        },
        {
          text:'Não'
        }

      ]
    });
    alert.present();
   }

   apagarMensagem(id){

   this.mensagemService.delete(id).subscribe(res=>{
     this.obterMensagens()
   })
 }

   apagarTodos(){
     this.mensagemService.deleteAll().subscribe(res=>{
       this.obterMensagens()
     })
   }

   openModal(mensagem) {
    let modal = this.modalCtrl.create('DetalhesMensagemPage', {mensagem:mensagem});
    modal.present();
    // refresh data after modal dismissed
    modal.onDidDismiss(() => this.ionViewDidLoad())
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



