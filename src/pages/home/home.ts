import { TanqueService } from './../../services/domain/tanque.service';
import { TransparenciaService } from "./../../services/domain/transparencia.service";
import { SalinidadeService } from "./../../services/domain/salinidade.service";
import { OxigenioDissolvidoService } from "./../../services/domain/oxigenioDissolvido.service";
import { NitritoService } from "./../../services/domain/nitrito.service";
import { NitratoService } from "./../../services/domain/nitrato.service";
import { AmoniaTotalService } from "./../../services/domain/amoniaTotal.service";

import { StorageService } from "./../../services/storage.service";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController
} from "ionic-angular";
import { UsuarioService } from "../../services/domain/usuario.service";
import { TemperaturaService } from "../../services/domain/temperatura.service";
import { PhService } from "../../services/domain/ph.service";
import { API_CONFIG } from "../../config/api.config";
import { DomSanitizer } from "@angular/platform-browser";
import { Globals } from "../../globals.array";
import { UsuarioDTO } from "../../models/usuario.dto";
import { LoginPage } from "../login/login";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  tanques: any;
  error: boolean = false;
  usuario: UsuarioDTO;
  email;
  perfis = [];
  temperatura: any;
  ph;
  amoniaTotal;
  nitrato;
  nitrito;
  oxigenioDissolvido;
  salinidade;
  transparencia;
  loopRecursivas: boolean;
  tempo: number = 20000;
  tanqueInexistente = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storageService: StorageService,
    public usuarioService: UsuarioService,
    public temperaturaService: TemperaturaService,
    public phService: PhService,
    public amoniaTotalService: AmoniaTotalService,
    public nitratoService: NitratoService,
    public nitritoService: NitritoService,
    public oxigenioDissolvidoService: OxigenioDissolvidoService,
    public salinidadeService: SalinidadeService,
    public transparenciaService: TransparenciaService,
    public sanitazer: DomSanitizer,
    public globals: Globals,
    public storage: StorageService,
    public toastCtrl:ToastController,
    public alertCtrl:AlertController,
    public tanqueService:TanqueService
  ) {
    this.loopRecursivas = true;
  }

  ionViewDidEnter() {
    this.usuarioService.preencherMenuDeAcordoComUsuario();
    this.obterTanques();
    this.getUser();
    this.executaPrimeiraVez()

  }

  ionViewWillLeave() {
    this.loopRecursivas = false;
  }
  getUser() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email).subscribe(
        response => {
          this.globals.usuario = response;
          this.usuario = response as UsuarioDTO;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      );
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket().subscribe(
      response => {
        this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${
          this.usuario.id
        }.jpg`;
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.globals.profileImage = this.sanitazer.bypassSecurityTrustUrl(
            str
          );
        });
      },
      error => {
        this.globals.profileImage = "assets/imgs/avatar-blank.png";
      }
    );
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = e => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  exibirTemperatura() {
    this.temperaturaService.findTemperatura().subscribe(response => {
      this.temperatura = response;
      this.error = false
    },error=>{this.alertErrorConexao()});
  }

  exibirPh() {
    this.phService.findPhs().subscribe(response => {
      this.ph = response;
      this.error = false
    },error=>{console.log(error)});
  }
  exibirNitrato() {
    this.nitratoService.findNitratos().subscribe(response => {
      this.nitrato = response;
      this.error = false
    },error=>{console.log(error)});
  }
  exibirNitrito() {
    this.nitritoService.findNitrito().subscribe(response => {
      this.nitrito = response;
      this.error = false
    },error=>{console.log(error)});
  }

  exibirOxigenioDissolvido() {
    this.oxigenioDissolvidoService
      .findOxigenioDissolvido()
      .subscribe(response => {
        this.oxigenioDissolvido = response;
        this.error = false
      },error=>{console.log(error)});
  }

  exibirSalinidade() {
    this.salinidadeService.findSalinidade().subscribe(response => {
      this.salinidade = response;
      this.error = false
    },error=>{console.log(error)});
  }

  exibirTransparencia() {
    this.transparenciaService.findTransparencia().subscribe(response => {
      this.transparencia = response;
      this.error = false
    },error=>{console.log(error)});
  }

  exibirAmoniaTotal() {
    this.amoniaTotalService.findAmonias().subscribe(response => {
      this.amoniaTotal = response;
      this.error = false
    },error=>{console.log(error)});
  }

  invocaMetodoMedicoes() {
    setTimeout(() => {
      if (this.loopRecursivas) {
        this.exibirTemperatura();
        this.exibirPh();
        this.exibirNitrato();
        this.exibirNitrito();
        this.exibirOxigenioDissolvido();
        this.exibirSalinidade();
        this.exibirTransparencia();
        this.exibirAmoniaTotal();
        this.invocaMetodoMedicoes();
      }
    }, this.tempo);
  }
  exibirToastAtualizado() {
    let toast = this.toastCtrl.create({
      message: 'Medição de propriedades estão em tempo Real',
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

  exibirToastDesatualizado() {
    let toast = this.toastCtrl.create({
      message: 'Medição de propriedades estão desatualizados',
      cssClass: "toast-error",
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }
  executaPrimeiraVez(){
    this.exibirTemperatura();
    this.exibirPh();
    this.exibirNitrato();
    this.exibirNitrito();
    this.exibirOxigenioDissolvido();
    this.exibirSalinidade();
    this.exibirTransparencia();
    this.exibirAmoniaTotal();
    this.invocaMetodoMedicoes()



  }
  alertErrorConexao(){
    let alert = this.alertCtrl.create({
      title:'Falha!',
      message:'Ocorreu algum problema na conexão',
      buttons:[
        {
          text:'Ok',

        }
      ]
    });
    this.error = true
    alert.present();

    setTimeout(() => {
      alert.dismiss()
    }, 5000);
  }
  obterTanques() {
    this.tanqueService.findAll().subscribe(res => {
      this.tanques = res;
      this.escolherTanque(this.tanques[0])
    });
  }
  escolherTanque(tanque){
    if(tanque && tanque.nome!=='Macuxi'){
      this.tanqueInexistente = true
    }else{
      this.tanqueInexistente = false
    }
  }

}
