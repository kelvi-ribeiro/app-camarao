import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ToastController
} from "ionic-angular";

/**
 * Generated class for the DetalhesMensagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-detalhes-mensagem",
  templateUrl: "detalhes-mensagem.html"
})
export class DetalhesMensagemPage {
  mensagem:any;
  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public navCtrl: NavController
  ) {

    this.mensagem = this.params.get('mensagem')

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
