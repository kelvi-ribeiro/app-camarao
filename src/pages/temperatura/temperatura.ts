import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TemperaturaService } from '../../services/domain/temperatura.service';

/**
 * Generated class for the TemperaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temperatura',
  templateUrl: 'temperatura.html',
})
export class TemperaturaPage {

  @ViewChild('lineCanvas') lineCanvas;

  temperatura;
  temperaturaOld;

  tempo:number = 10000;
  loopRecursivas: boolean;

  carregando:boolean = true;

  lineChart;

  constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            public temperaturaService:TemperaturaService) {
              this.loopRecursivas = true;
    this.exibirTemperaturaEmCincoSegundos();

  }

  ionViewWillLeave() {
    this.loopRecursivas = false;

  }

  exibirTemperaturaEmCincoSegundos() {
    if (this.loopRecursivas) {
      this.temperaturaService.findTemperatura().subscribe(response => {
        this.temperatura = response;
        if(this.carregando){
          this.createChart();
          this.carregando = false;
        }
        this.exibirTemperaturaEmCincoSegundos();
        })
      }
  }

  createChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Temperatura',
          data: [this.temperatura.temperatura],
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 15,

        }],

      },
    });
    this.updateChart();
    this.carregando = false;
}

updateChart() {
  setTimeout(() => {
    if(this.temperaturaOld!=undefined){
      this.lineChart.data.datasets[0].data[0] = this.temperaturaOld;
    }
    this.lineChart.data.datasets[0].data[1] = this.temperatura.temperatura;
    this.lineChart.update();
    this.temperaturaOld = this.temperatura.temperatura
    this.updateChart();


  }, this.tempo);
}


}
