import { TransparenciaService } from './../../services/domain/transparencia.service';
import { SalinidadeService } from './../../services/domain/salinidade.service';
import { OxigenioDissolvidoService } from './../../services/domain/oxigenioDissolvido.service';
import { NitritoService } from './../../services/domain/nitrito.service';
import { NitratoService } from './../../services/domain/nitrato.service';
import { AmoniaTotalService } from './../../services/domain/amoniaTotal.service';

import { StorageService } from './../../services/storage.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { Globals } from '../../globals.array';
import { TemperaturaService } from '../../services/domain/temperatura.service';
import { PhService } from '../../services/domain/ph.service';
import { API_CONFIG } from '../../config/api.config';
import { Chart } from 'chart.js';


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

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  email;
  usuario;
  perfis = [];

  temperatura: any;
  temperaturaOld;

  ph;
  amoniaTotal;
  nitrato;
  nitrito;
  oxigenioDissolvido;
  salinidade;
  transparencia;
  loopRecursivas: boolean;
  tempo: number = 2000;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storageService: StorageService,
    public usuarioService: UsuarioService,
    public global: Globals,
    public temperaturaService: TemperaturaService,
    public phService: PhService,
    public amoniaTotalService: AmoniaTotalService,
    public nitratoService: NitratoService,
    public nitritoService: NitritoService,
    public oxigenioDissolvidoService: OxigenioDissolvidoService,
    public salinidadeService: SalinidadeService,
    public transparenciaService: TransparenciaService
  ) {
    this.email = this.storageService.getLocalUser().email;
    this.usuarioService.findByEmail(this.email)
      .subscribe((response => {
        this.perfis = response['perfis'];
        this.storageService.setUserPerfil(this.perfis)
        this.perfis.forEach((perfil => {


          if (perfil === 'ADMIN') {

            this.global.pages = [
              { title: 'Home', component: 'HomePage' },
              { title: 'Meu Perfil', component: 'ProfilePage' },
              { title: 'Meus Funcionarios', component: 'FuncionariosPage' },
              { title: 'Cadastrar Novo Funcionário', component: 'SignupPage' },
              { title: 'Logout', component: '' }
            ];

          }
        }));

        this.usuario = response;


      }))
    this.loopRecursivas = true;
    this.exibirTemperaturaEmCincoSegundos();
    this.exibirPhEmCincoSegundos();
    this.exibirNitratoEmCincoSegundos();
    this.exibirNitritoEmCincoSegundos();
    this.exibirOxigenioDissolvidoEmCincoSegundos();
    this.exibirSalinidadeEmCincoSegundos();
    this.exibirTransparenciaEmCincoSegundos();
    this.exibirAmoniaTotalEmCincoSegundos();
    setTimeout(() => {
      this.createChart();
    }, 4000);
  }
    ionViewDidEnter() {

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

  exibirTemperaturaEmCincoSegundos() {
    setTimeout(() => {
      this.temperaturaService.findTemperatura().subscribe(response => {
        this.temperatura = response;
        if (this.loopRecursivas) {
          this.exibirTemperaturaEmCincoSegundos();
        }
      })
    }, this.tempo);
  }

  exibirPhEmCincoSegundos() {
    setTimeout(() => {
      this.phService.findPhs().subscribe(response => {
        this.ph = response;
        if (this.loopRecursivas) {

          this.exibirPhEmCincoSegundos();
        }
      })
    }, this.tempo);
  }
  exibirNitratoEmCincoSegundos() {
    setTimeout(() => {
      this.nitratoService.findNitratos().subscribe(response => {
        this.nitrato = response;
        if (this.loopRecursivas) {

          this.exibirNitratoEmCincoSegundos();
        }
      })
    }, this.tempo);
  }
  exibirNitritoEmCincoSegundos() {
    setTimeout(() => {
      this.nitritoService.findNitrito().subscribe(response => {
        this.nitrito = response;
        if (this.loopRecursivas) {

          this.exibirNitritoEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirOxigenioDissolvidoEmCincoSegundos() {
    setTimeout(() => {
      this.oxigenioDissolvidoService.findOxigenioDissolvido().subscribe(response => {
        this.oxigenioDissolvido = response;
        if (this.loopRecursivas) {

          this.exibirOxigenioDissolvidoEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirSalinidadeEmCincoSegundos() {
    setTimeout(() => {
      this.salinidadeService.findSalinidade().subscribe(response => {
        this.salinidade = response;
        if (this.loopRecursivas) {

          this.exibirSalinidadeEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirTransparenciaEmCincoSegundos() {
    setTimeout(() => {
      this.transparenciaService.findTransparencia().subscribe(response => {
        this.transparencia = response;
        if (this.loopRecursivas) {

          this.exibirTransparenciaEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  exibirAmoniaTotalEmCincoSegundos() {
    setTimeout(() => {
      this.amoniaTotalService.findAmonias().subscribe(response => {
        this.amoniaTotal = response;
        if (this.loopRecursivas) {

          this.exibirAmoniaTotalEmCincoSegundos();
        }
      })
    }, this.tempo);

  }

  createChart() {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Temperatura',
            data: [this.temperatura.temperatura],

          }]
        },
      });
      this.updateChart();
  }

  updateChart() {
    setTimeout(() => {
      if(this.temperaturaOld!=undefined){
        this.lineChart.data.datasets[0].data[0] = this.temperaturaOld;
      }
      this.lineChart.data.datasets[0].data[1] = this.temperatura.temperatura;
      this.lineChart.data.labels[1] = 'Nova Temperatura';
      this.lineChart.update();
      this.temperaturaOld = this.temperatura.temperatura
      this.updateChart();


    }, 10000);
  }
}


