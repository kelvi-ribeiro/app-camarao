import { Chart } from "chart.js";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PhService } from "../../services/domain/ph.service";

@IonicPage()
@Component({
  selector: "page-ph",
  templateUrl: "ph.html"
})
export class PhPage {
  @ViewChild("lineCanvas") lineCanvas;

  ph;
  phOld;

  tempo: number = 5000;
  loopRecursivas: boolean;

  carregando: boolean = true;

  lineChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public phService: PhService
  ) {
    this.loopRecursivas = true;

    this.exibirPhEmCincoSegundos();
  }

  ionViewWillLeave() {
    this.loopRecursivas = false;
  }

  exibirPhEmCincoSegundos() {
    setTimeout(() => {
      if (this.loopRecursivas) {
        this.phService.findPhs().subscribe(response => {
          this.ph = response;
          if (this.carregando) {
            this.createChart();
            this.carregando = false;
          }
          this.exibirPhEmCincoSegundos();
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
            label: "Salinidade",
            data: [this.ph.ph],
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
      if (this.phOld != undefined) {
        this.lineChart.data.datasets[0].data[0] = this.phOld;
      }
      this.lineChart.data.datasets[0].data[1] = this.ph.ph;
      this.lineChart.update();
      this.phOld = this.ph.ph;
      this.updateChart();
    }, this.tempo);
  }
}
