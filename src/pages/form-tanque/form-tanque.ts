import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../../globals.array';
import { Geolocation } from '@ionic-native/geolocation';
import { TanqueService } from '../../services/domain/tanque.service';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../../services/storage.service';

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
  endereco;
  nomeUsuario;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public globals:Globals,
              public geolocation:Geolocation,
              public tanqueService:TanqueService,
              public alertCtrl:AlertController,
              public storageService:StorageService
              )

               {


          this.usuarioId = this.globals.usuario.id
          this.formGroup = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            latitude: [],
            longitude: [],
            usuarioId:[this.usuarioId]
          });
     }
     ionViewDidLoad(){
       this.nomeUsuario = this.storageService.getUserName()
      this.buscarLocalizacao()
     }
  criarTanque(){
    this.tanqueService.insert(this.formGroup.value).subscribe(res=>{
      this.showInsertOk()
    })
  }
  obterLatitudeLogitude(){
    this.criarTanque()
  }
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Tanque inserido com sucesso, com a sua localização atual',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{
            this.navCtrl.setRoot('HomePage')
          }
        }
      ]
    });
    alert.present();
  }
  buscarLocalizacao(){
    this.geolocation.getCurrentPosition().then((resp) => {


      this.formGroup.controls.latitude.setValue(resp.coords.latitude)
      this.formGroup.controls.longitude.setValue(resp.coords.longitude)
      this.buscarEndereco()

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  buscarEndereco(){
    this.tanqueService.buscarEndereco(this.formGroup.value.latitude,this.formGroup.value.longitude).subscribe(res=>{
      this.endereco = res.results[0].formatted_address
    })
  }
}
