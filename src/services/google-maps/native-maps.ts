import { Globals } from './../../globals.array';
import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

@Injectable()
export class NativeMapsProvider {

  map: any;

  constructor(public googleMaps: GoogleMaps) {

  }

  init(location, element,tanque){

    let latLng = new LatLng(location.latitude, location.longitude);

    let opts = {
      camera: {
        latLng: latLng,
        zoom:70,
        tilt: 30
      }
    };


      console.log('this.globals',tanque)
      this.map = this.googleMaps.create(element.nativeElement, opts);
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      this.map.setMyLocationEnabled(true);
      this.map.addMarker({
        title: `Tanque ${tanque.nome}`,
        icon: 'red',
        animation: 'DROP',
        position:latLng
        })
    .then(marker => {
      marker.showInfoWindow()
    marker.on(GoogleMapsEvent.MARKER_CLICK)
    .subscribe(() => {
        alert('Clique no Ícone da seta logo abaixo, para criar uma rota entre você e o tanque');
      });
    });

    });



  }

}
