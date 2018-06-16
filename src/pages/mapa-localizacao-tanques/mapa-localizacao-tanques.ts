import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MapsProvider } from "../../services/google-maps/maps";
import { Geolocation } from '@ionic-native/geolocation';
import { TanqueService } from "../../services/domain/tanque.service";
import { Globals } from "../../globals.array";
import { LatLng } from "@ionic-native/google-maps";

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
  markerOptions = []

  @ViewChild("map") mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams:NavParams,
    public geolocation: Geolocation,
    public mapsProvider: MapsProvider,
    public tanqueService:TanqueService,

  ) {
  }

  ionViewDidLoad() {
    this.obterTanques()

  }

  findUserLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.criaObjetoMarksBaseadoTanques()
      console.log(this.markerOptions,this.location)
      this.mapsProvider.init(this.location, this.mapElement,this.markerOptions);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


  obterTanques(){
    this.tanqueService.findAll().subscribe(res=>{
      this.tanques = res;

      this.findUserLocation();
    })
  }

  criaObjetoMarksBaseadoTanques(){
    let latLng;
    this.tanques.forEach(element => {
      latLng  = new LatLng(element.latitude, element.longitude);
      let markerOption ={
        title:`Tanque ${element.nome}`,
        position:latLng,
        icon: 'red',
        animation: 'DROP',
      }
      this.markerOptions.push(markerOption)
    });
  }
}
