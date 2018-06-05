import { Chart } from 'chart.js';
import { OxigenioDissolvidoService } from './../../services/domain/oxigenioDissolvido.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OxigenioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oxigenio',
  templateUrl: 'oxigenio.html',
})
export class OxigenioPage {
  @ViewChild("lineCanvas") lineCanvas;

  oxigenio;
  oxigenioOld;

  tempo: number = 5000;
  loopRecursivas: boolean;

  carregando: boolean = true;

  lineChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public oxigenioService: OxigenioDissolvidoService
  ) {
    this.loopRecursivas = true;

    this.exibirOxigenioEmCincoSegundos();
  }

  ionViewWillLeave() {
    this.loopRecursivas = false;
  }

  exibirOxigenioEmCincoSegundos() {
    setTimeout(() => {
      if (this.loopRecursivas) {
        this.oxigenioService.findOxigenioDissolvido().subscribe(response => {
          this.oxigenio = response;
          if (this.carregando) {
            this.createChart();
            this.carregando = false;
          }
          this.exibirOxigenioEmCincoSegundos();
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
            label: "Oxigênio Dissolvido",
            data: [this.oxigenio.oxigenio],
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
      if (this.oxigenioOld != undefined) {
        this.lineChart.data.datasets[0].data[0] = this.oxigenioOld;
      }
      this.lineChart.data.datasets[0].data[1] = this.oxigenio.oxigenio;
      this.lineChart.update();
      this.oxigenioOld = this.oxigenio.oxigenio;
      this.updateChart();
    }, this.tempo);
  }


}
