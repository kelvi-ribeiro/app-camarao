import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ModalController,
  LoadingController
} from "ionic-angular";
import { MensagemService } from "../../services/domain/mensagem.service";
import { UsuarioService } from "../../services/domain/usuario.service";
import { API_CONFIG } from "../../config/api.config";
import { Globals } from "../../globals.array";
import { StorageService } from "../../services/storage.service";

/**
 * Generated class for the ListaMensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-lista-mensagens",
  templateUrl: "lista-mensagens.html"
})
export class ListaMensagensPage {
  mensagens;
  admin = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mensagemService: MensagemService,
    public alertCtrl: AlertController,
    public usuarioService: UsuarioService,
    public modalCtrl: ModalController,
    public globals: Globals,
    public loadingCtrl: LoadingController,
    public storageService:StorageService
  ) {}

  ionViewDidLoad() {
    const loading = this.presentLoadingDefault();
    this.obterMensagens();
    this.verificaUsuarioAdmin();
    loading.dismiss();
  }

  verificaUsuarioAdmin() {
      if (this.storageService.getUserPerfil().find(e => e == "ADMIN")) {
        this.admin = true;

    }
  }

  obterMensagens() {
    this.mensagemService.findAll().subscribe(mensagens => {
      this.mensagens = mensagens;
      this.mensagens.forEach(mensagem => {
        mensagem = this.getImageIfExists(mensagem);
      });
    });
  }

  alertApagarTodos() {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message:
        "Esta ação vai apagar todas os avisos, deseja mesmo fazer isso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagarTodos();
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }

  alertApagarMensagem(id) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Deseja mesmo apagar esse Aviso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagarMensagem(id);
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }

  apagarMensagem(id) {
    this.mensagemService.delete(id).subscribe(res => {
      this.obterMensagens();
    });
  }

  apagarTodos() {
    this.mensagemService.deleteAll().subscribe(res => {
      this.obterMensagens();
    });
  }

  openModal(mensagem) {
    let modal = this.modalCtrl.create("DetalhesMensagemPage", {
      mensagem: mensagem
    });
    modal.present();
    // refresh data after modal dismissed
    modal.onDidDismiss(() => this.ionViewDidLoad());
  }

  getImageIfExists(mensagem) {
    this.usuarioService.getImageFromBucketFromUsers(mensagem['urlFoto']).subscribe(
      response => {
        mensagem.imageUrl = `${API_CONFIG.bucketBaseUrl}/${
          mensagem["urlFoto"]
        }`
        return mensagem;
      },
      error => {}
    );
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loading.present();
    return loading;
  }
}
