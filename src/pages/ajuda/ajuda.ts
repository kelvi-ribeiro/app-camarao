import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the AjudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html',
})
export class AjudaPage {
  idiomaPortugues = true;
  

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl:ToastController,
              public storageService:StorageService) {
  }

  ionViewDidLoad() {
    this.presentToast(`Dear ${this.storageService.getUserName()}, is possible translate the contents of this screen by clicking on the image next to the menu`,'toast-attention')
  }
  trocarIdioma(){
    if(this.idiomaPortugues){
      this.idiomaPortugues = false
    }else{
      this.idiomaPortugues = true
    }
  }
  presentToast(message,css) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:css
    });

    toast.present();
  }


}
