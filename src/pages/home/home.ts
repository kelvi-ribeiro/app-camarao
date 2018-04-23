import { Globals } from './../../globals.array';
import { TransparenciaService } from './../../services/domain/transparencia.service';
import { SalinidadeService } from './../../services/domain/salinidade.service';
import { OxigenioDissolvidoService } from './../../services/domain/oxigenioDissolvido.service';
import { NitritoService } from './../../services/domain/nitrito.service';
import { NitratoService } from './../../services/domain/nitrato.service';
import { AmoniaTotalService } from './../../services/domain/amoniaTotal.service';

import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { TemperaturaService } from '../../services/domain/temperatura.service';
import { PhService } from '../../services/domain/ph.service';
import { API_CONFIG } from '../../config/api.config';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  email;
  usuario;
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
  tempo: number = 5000;

  constructor(public navCtrl: NavController,
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
    public global: Globals
  ) {
    this.loopRecursivas = true;

  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.presentLoadingDefault();
    this.usuarioService.preencherMenuDeAcordoComUsuario();
    this.invocaMetodoMedicoes();
  }

  ionViewWillLeave() {
    this.loopRecursivas = false;

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, this.tempo);
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
      .subscribe(response => {
        this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
      },
        error => { });
  }

  exibirTemperatura() {
        this.temperaturaService.findTemperatura().subscribe(response => {
          this.temperatura = response;
        });
  }

  exibirPh() {
      this.phService.findPhs().subscribe(response => {
          this.ph = response;
        })

  }
  exibirNitrato() {
      this.nitratoService.findNitratos().subscribe(response => {
          this.nitrato = response;
        })
  }
  exibirNitrito() {
      this.nitritoService.findNitrito().subscribe(response => {
          this.nitrito = response;
        })
       }

  exibirOxigenioDissolvido() {
      this.oxigenioDissolvidoService.findOxigenioDissolvido().subscribe(response => {
          this.oxigenioDissolvido = response;
        })
     }

  exibirSalinidade() {
      this.salinidadeService.findSalinidade().subscribe(response => {
          this.salinidade = response;
      })
    }

  exibirTransparencia() {
      this.transparenciaService.findTransparencia().subscribe(response => {
          this.transparencia = response;
      });
    }

  exibirAmoniaTotal() {
        this.amoniaTotalService.findAmonias().subscribe(response => {
          this.amoniaTotal = response;
        })
     }

  invocaMetodoMedicoes(){
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
      this.invocaMetodoMedicoes()
    }
    }, this.tempo);
  }
}
