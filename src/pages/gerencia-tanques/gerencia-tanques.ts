import { StorageService } from "./../../services/storage.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from "ionic-angular";
import { TanqueService } from "../../services/domain/tanque.service";
import { API_CONFIG } from "../../config/api.config";
import { UsuarioService } from "../../services/domain/usuario.service";

/**
 * Generated class for the GerenciaTanquesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-gerencia-tanques",
  templateUrl: "gerencia-tanques.html"
})
export class GerenciaTanquesPage {
  admin = false;
  tanques: any;
  constructor(
    public navCtrl: NavController,
    public tanqueService: TanqueService,
    public storageService: StorageService,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public usuarioService: UsuarioService,
  ) {}

  ionViewDidLoad() {
    this.verificaUsuarioAdmin();
    this.obterTanques();
  }
  obterTanques() {
    this.tanqueService.findAll().subscribe(res => {
      this.tanques = res;
      this.tanques.forEach(tanque => {
        tanque = this.getImageIfExists(tanque);
      });
    });
  }
  verificaUsuarioAdmin() {
    if (this.storageService.getUserPerfil().find(e => e == "ADMIN")) {
      this.admin = true;
    }
  }
  alertApagarTanque(id) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Deseja mesmo apagar esse Tanque ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagarTanque(id);
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }

  apagarTanque(id) {
    this.tanqueService.delete(id).subscribe(res => {
      this.obterTanques();
    });
  }
  getImageIfExists(tanque) {
    this.usuarioService.getImageFromBucketFromUsers(tanque['urlFotoUsuario']).subscribe(
      response => {
        tanque.imageUrl = `${API_CONFIG.bucketBaseUrl}/${
          tanque["urlFotoUsuario"]
        }`
        return tanque;
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
