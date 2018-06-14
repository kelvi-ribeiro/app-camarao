import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MapsProvider } from "../../services/google-maps/maps";
import { Geolocation } from '@ionic-native/geolocation';
import { TanqueService } from "../../services/domain/tanque.service";

/**
 * Generated class for the MapaLocalizacaoTanquesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mapa-localizacao-tanques",
  templateUrl: "mapa-localizacao-tanques.html"
})
export class MapaLocalizacaoTanquesPage {
  location: {
    latitude: number;
    longitude: number;
  };
  tanques = []
  tanqueAtivo

  @ViewChild("map") mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams:NavParams,
    public geolocation: Geolocation,
    public mapsProvider: MapsProvider,
    public tanqueService:TanqueService
  ) {
    this.tanqueAtivo = this.navParams.get('tanque')
    console.log('this.tanqueAtivo',this.tanqueAtivo)
  }

  ionViewDidLoad() {
    this.obterTanques()

  }

  findUserLocation(tanque) {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };

    this.location = {
      latitude: tanque.latitude,
      longitude: tanque.longitude
    };
    this.mapsProvider.init(this.location, this.mapElement);

  }
  obterTanques(){
    this.tanqueService.findAll().subscribe(res=>{
      this.tanques = res;
      if(this.tanqueAtivo){
        const index = this.tanques.findIndex(el=> this.tanqueAtivo.id===el.id)
        console.log('index',index)
        this.tanques.splice(index,1)
      }
      this.findUserLocation(this.tanqueAtivo ? this.tanqueAtivo : this.tanques[0]);
    })
  }
  trocarLocalizacao(tanque){
    console.log('see',tanque);
    this.navCtrl.setRoot('MapaLocalizacaoTanquesPage',{tanque:tanque})

  }
}
