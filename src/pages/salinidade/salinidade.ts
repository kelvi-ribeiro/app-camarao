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
  phOld;

  tempo:number = 10000;
  loopRecursivas: boolean;

  carregando:boolean = true;

  lineChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public salinidadeService:SalinidadeService) {
      this.loopRecursivas = true;
this.exibirPhEmCincoSegundos();

}

  ionViewWillLeave() {
    this.loopRecursivas = false;

  }

  exibirPhEmCincoSegundos() {
      this.salinidadeService.findSalinidade().subscribe(response => {
        this.salinidade = response;
        if(this.carregando){
          this.createChart();
          this.carregando = false;
        }


        if (this.loopRecursivas) {
          this.exibirPhEmCincoSegundos();
        }
      })
  }

  createChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: 'salinidade',
          data: [this.salinidade.salinidade],

        }],

      },
    });
    this.updateChart();
    this.carregando = false;
}

updateChart() {
  setTimeout(() => {
    if(this.phOld!=undefined){
      this.lineChart.data.datasets[0].data[0] = this.phOld;
    }
    this.lineChart.data.datasets[0].data[1] = this.salinidade.salinidade;
    this.lineChart.update();
    this.phOld = this.salinidade.salinidade
    this.updateChart();


  }, this.tempo);
}


}
