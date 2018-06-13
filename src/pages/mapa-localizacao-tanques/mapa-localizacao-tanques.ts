import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MapsProvider } from "../../services/google-maps/maps";
import { Geolocation } from '@ionic-native/geolocation';

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

  @ViewChild("map") mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public mapsProvider: MapsProvider
  ) {}

  ionViewDidLoad() {
    this.findUserLocation();
  }

  findUserLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };

    this.geolocation
      .watchPosition(options)
      .subscribe(position => {
        console.log(position);

        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.mapsProvider.init(this.location, this.mapElement);
      })

  }
}
