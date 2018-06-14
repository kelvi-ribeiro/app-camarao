import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhService } from '../../services/domain/ph.service';

/**
 * Generated class for the RelatorioCompletoPropriedadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorio-completo-propriedades',
  templateUrl: 'relatorio-completo-propriedades.html',
})
export class RelatorioCompletoPropriedadesPage {
  page = 0;
  phs;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public phService:PhService) {
  }

  ionViewDidLoad() {
   this.pesquisaPhs()
  }
  incrementaPage(){ 
    this.page++;
    this.pesquisaPhs()
  }
  pesquisaPhs(){
    this.phService.findPhsPage(this.page).subscribe(res=>{
      this.phs = res;
      })
  }

}
