import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

@Injectable()
export class NativeMapsProvider {

  map: any;

  constructor(public googleMaps: GoogleMaps) {

  }

  init(location, element){

    let latLng = new LatLng(location.latitude, location.longitude);

    let opts = {
      camera: {
        latLng: latLng,
        zoom:70,
        tilt: 30
      }
    };


    if(!this.map){
      this.refreshMap(element,opts)
    }else{
      this.map = this.googleMaps.create(element.nativeElement, opts);
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      this.map.setMyLocationEnabled(true)
      
    });

    }

  }
  refreshMap(element, opts){

    let map = GoogleMaps.create(element.nativeElement, opts);
    map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    map.setMyLocationEnabled(true)
      
    });


  }

}
