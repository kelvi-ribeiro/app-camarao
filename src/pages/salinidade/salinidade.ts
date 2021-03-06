import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalinidadeService } from '../../services/domain/salinidade.service';

/**
 * Generated class for the SalinidadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salinidade',
  templateUrl: 'salinidade.html',
})
export class SalinidadePage {
  @ViewChild('lineCanvas') lineCanvas;

  salinidade;
  salinidadeOld;

  tempo:number = 5000;
  loopRecursivas: boolean;

  carregando:boolean = true;

  lineChart;

  constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            public salinidadeService:SalinidadeService) {
              this.loopRecursivas = true;

    this.exibirSalinidadeEmCincoSegundos();

  }

  ionViewWillLeave() {
    this.loopRecursivas = false;

  }

  exibirSalinidadeEmCincoSegundos() {
    setTimeout(() => {
      if (this.loopRecursivas) {
        this.salinidadeService.findSalinidade().subscribe(response => {
          this.salinidade = response;
          if(this.carregando){
            this.createChart();
            this.carregando = false;
          }
          this.exibirSalinidadeEmCincoSegundos();
          })
        }

    }, this.tempo);
  }

  createChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Salinidade',
          data: [this.salinidade.salinidade],
          fill: false,
          backgroundColor: "rgba(255,255,255,255)",
          borderColor: "rgba(255,255,255,255)",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(255,255,255,255)",
          pointBackgroundColor: "rgba(255,255,255,255)",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,255,255,255)",
          pointHoverBorderColor: "rgba(255,255,255,255)",
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 15,


        }],

      },
      options:{
        display:false
      }
    });


    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontStyle = 'bold';
    Chart.defaults.global.defaultFontSize = 18;
    this.updateChart();
    this.carregando = false;
}

updateChart() {
  setTimeout(() => {
    if(this.salinidadeOld!=undefined){
      this.lineChart.data.datasets[0].data[0] = this.salinidadeOld;
    }
    this.lineChart.data.datasets[0].data[1] = this.salinidade.salinidade;
    this.lineChart.update();
    this.salinidadeOld = this.salinidade.salinidade
    this.updateChart();


  }, this.tempo);
}


}
