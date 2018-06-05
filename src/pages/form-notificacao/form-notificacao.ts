import { MensagemService } from './../../services/domain/mensagem.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Globals } from '../../globals.array';

/**
 * Generated class for the FormNotificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-notificacao',
  templateUrl: 'form-notificacao.html',
})
export class FormNotificacaoPage {
  formGroup: FormGroup;
  usuarioId;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public mensagemService:MensagemService,
              public alertCtrl:AlertController,
              public globals:Globals) {

          this.usuarioId = this.globals.usuario.id
          this.formGroup = this.formBuilder.group({
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            mensagem: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
            clienteId: [this.usuarioId],
          });
  }

  ionViewDidLoad() {

  }

  mandarNotificao() {
    this.mensagemService.insert(this.formGroup.value)
    .subscribe(response=>{
      this.showInsertOk();
    },
  error =>{});
  }
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Mensagem enviada com sucesso',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{
            this.navCtrl.setRoot('ListaMensagensPage')
          }
        }
      ]
    });
    alert.present();
  }
}
