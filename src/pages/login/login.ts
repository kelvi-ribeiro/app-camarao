import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CreadenciaisDTO } from '../../models/credenciais.dto';
import { Globals } from '../../globals.array';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  perfis = [];
  creds : CreadenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public global:Globals,
    public usuarioService:UsuarioService,
    public storageService:StorageService,
    public alertCtrl:AlertController) {

      this.creds.email = storageService.getEmail()

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    this.usuarioService.preencherMenuDeAcordoComUsuario();
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewWillLeave(){

  }


  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('HomePage');
      },
      error => {});
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.alertSalvarLogin(this.creds.email)
        this.navCtrl.setRoot('HomePage');
      },
      error => {
        //this.showAlert();
      });
  }
  signup(){
    this.navCtrl.push('SignupPage')
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      title:'Falha!',
      message:'Falha na conexão, tente novamente...',
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

  salvarLogin(email){
    this.storageService.setEmail(email)
  }

  alertSalvarLogin(email){
    let alert = this.alertCtrl.create({
      title:'Salvar Login!',
      message:'Deseja Salvar o Login ?',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Sim',
          handler:() =>{
            this.salvarLogin(email)
          }

        },
        {
          text:'Não',
          handler:()=> {
            this.storageService.setEmail(null)
          }
        }

      ]
    });
    alert.present();
   }

}
