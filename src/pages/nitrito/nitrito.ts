import { Chart } from 'chart.js';
import { NitritoService } from './../../services/domain/nitrito.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NitritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nitrito',
  templateUrl: 'nitrito.html',
})
export class NitritoPage {
  @ViewChild("lineCanvas") lineCanvas;

  nitrito;
  nitritoOld;

  tempo: number = 5000;
  loopRecursivas: boolean;

  carregando: boolean = true;

  lineChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nitritoService: NitritoService
  ) {
    this.loopRecursivas = true;

    this.exibirNitritoEmCincoSegundos();
  }

  ionViewWillLeave() {
    this.loopRecursivas = false;
  }

  exibirNitritoEmCincoSegundos() {
    setTimeout(() => {
      if (this.loopRecursivas) {
        this.nitritoService.findNitrito().subscribe(response => {
          this.nitrito = response;
          if (this.carregando) {
            this.createChart();
            this.carregando = false;
          }
          this.exibirNitritoEmCincoSegundos();
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
            label: "Nitrito",
            data: [this.nitrito.nitrito],
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
      if (this.nitritoOld != undefined) {
        this.lineChart.data.datasets[0].data[0] = this.nitritoOld;
      }
      this.lineChart.data.datasets[0].data[1] = this.nitrito.nitrito;
      this.lineChart.update();
      this.nitritoOld = this.nitrito.nitrito;
      this.updateChart();
    }, this.tempo);
  }

}
