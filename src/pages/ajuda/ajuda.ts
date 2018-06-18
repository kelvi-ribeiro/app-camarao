import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }
  trocarIdioma(){
    if(this.idiomaPortugues){
      this.idiomaPortugues = false
    }else{
      this.idiomaPortugues = true
    }
  }

}
