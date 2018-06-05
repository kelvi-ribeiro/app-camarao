import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmoniaTotalService } from '../../services/domain/amoniaTotal.service';

/**
 * Generated class for the AmoniaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-amonia',
  templateUrl: 'amonia.html',
})
export class AmoniaPage {
  @ViewChild("lineCanvas") lineCanvas;

  amonia;
  amoniaOld;

  tempo: number = 5000;
  loopRecursivas: boolean;

  carregando: boolean = true;

  lineChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public amoniaService: AmoniaTotalService
  ) {
    this.loopRecursivas = true;

    this.exibirAmoniaEmCincoSegundos();
  }

  ionViewWillLeave() {
    this.loopRecursivas = false;
  }

  exibirAmoniaEmCincoSegundos() {
    setTimeout(() => {
      if (this.loopRecursivas) {
        this.amoniaService.findAmonias().subscribe(response => {
          this.amonia = response;
          if (this.carregando) {
            this.createChart();
            this.carregando = false;
          }
          this.exibirAmoniaEmCincoSegundos();
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
            label: "Amônia Total",
            data: [this.amonia.amoniaTotal],
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
      if (this.amoniaOld != undefined) {
        this.lineChart.data.datasets[0].data[0] = this.amoniaOld;
      }
      this.lineChart.data.datasets[0].data[1] = this.amonia.amoniaTotal;
      this.lineChart.update();
      this.amoniaOld = this.amonia.amoniaTotal;
      this.updateChart();
    }, this.tempo);
  }

}
