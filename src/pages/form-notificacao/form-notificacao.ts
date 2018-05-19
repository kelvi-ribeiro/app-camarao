import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public usuarioService:UsuarioService,
              public alertCtrl:AlertController) {

                this.formGroup = this.formBuilder.group({
                  titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
                  mensagem: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(120)]],
                });
  }

  ionViewDidLoad() {

  }

  mandarNotificao() {
    this.usuarioService.sendNotificao(this.formGroup.value)
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

          }
        }
      ]
    });
    alert.present();
  }
}
