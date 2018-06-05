import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransparenciaService } from '../../services/domain/transparencia.service';

/**
 * Generated class for the TransparenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transparencia',
  templateUrl: 'transparencia.html',
})
export class TransparenciaPage {
  @ViewChild("lineCanvas") lineCanvas;

  transparencia;
  transparenciaOld;

  tempo: number = 5000;
  loopRecursivas: boolean;

  carregando: boolean = true;

  lineChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public transparenciaService: TransparenciaService
  ) {
    this.loopRecursivas = true;

    this.exibirTransparenciaEmCincoSegundos();
  }

  ionViewWillLeave() {
    this.loopRecursivas = false;
  }

  exibirTransparenciaEmCincoSegundos() {
    setTimeout(() => {
      if (this.loopRecursivas) {
        this.transparenciaService.findTransparencia().subscribe(response => {
          this.transparencia = response;
          if (this.carregando) {
            this.createChart();
            this.carregando = false;
          }
          this.exibirTransparenciaEmCincoSegundos();
        });
      }
    }, this.tempo);
  }

  createChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Transparência",
            data: [this.transparencia.transparencia],
            fill: false,
            backgroundColor: "rgba(255,255,255,255)",
            borderColor: "rgba(255,255,255,255)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(255,255,255,255)",
            pointBackgroundColor: "rgba(255,255,255,255)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,255,255,255)",
            pointHoverBorderColor: "rgba(255,255,255,255)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 15
          }
        ]
      },
      options: {
        display: false
      }
    });

    Chart.defaults.global.defaultFontColor = "white";
    Chart.defaults.global.defaultFontStyle = "bold";
    Chart.defaults.global.defaultFontSize = 18;
    this.updateChart();
    this.carregando = false;
  }

  updateChart() {
    setTimeout(() => {
      if (this.transparenciaOld != undefined) {
        this.lineChart.data.datasets[0].data[0] = this.transparenciaOld;
      }
      this.lineChart.data.datasets[0].data[1] = this.transparencia.transparencia;
      this.lineChart.update();
      this.transparenciaOld = this.transparencia.transparencia;
      this.updateChart();
    }, this.tempo);
  }


}
