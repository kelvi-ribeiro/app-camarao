import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../../globals.array';
import { Geolocation } from '@ionic-native/geolocation';
import { TanqueService } from '../../services/domain/tanque.service';

/**
 * Generated class for the FormTanquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-tanque',
  templateUrl: 'form-tanque.html',
})
export class FormTanquePage {
  formGroup: FormGroup;
  usuarioId;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public globals:Globals,
              public geolocation:Geolocation,
              public tanqueService:TanqueService)
               {


          this.usuarioId = this.globals.usuario.id
          this.formGroup = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            latitude: [],
            longitude: [],
            usuarioId:[this.usuarioId]
          });
  }
  criarTanque(){
    this.tanqueService.insert(this.formGroup.value).subscribe(res=>{})
  }
  obterLatitudeLogitude(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp.coords.latitude',resp.coords.latitude);

      this.formGroup.controls.latitude.setValue(resp.coords.latitude)
      this.formGroup.controls.longitude.setValue(resp.coords.longitude)
      this.criarTanque()

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
