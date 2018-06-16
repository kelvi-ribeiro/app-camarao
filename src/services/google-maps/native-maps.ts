import { Globals } from './../../globals.array';
import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

@Injectable()
export class NativeMapsProvider {

  map: any;

  constructor(public googleMaps: GoogleMaps) {

  }

  init(location, element,markerOptions){

    let latLng = new LatLng(location.latitude, location.longitude);

    let opts = {
      camera: {
        latLng: latLng,
        zoom:70,
        tilt: 30
      }
    };


      console.log('this.globals',markerOptions)
      this.map = this.googleMaps.create(element.nativeElement, opts);
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      this.map.setMyLocationEnabled(true);
      markerOptions.forEach(element => {
        this.map.addMarker(element)
      });


    });



  }

}
