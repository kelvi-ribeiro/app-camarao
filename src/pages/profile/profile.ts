import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario: UsuarioDTO;
  picture: string;
  cameraOn: boolean = false;
  profileImage;
  apertouCamera = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public camera: Camera,
    public sanitazer:DomSanitizer,
    public loadingCtrl:LoadingController) {

  }

  ionViewDidEnter() {
    this.profileImage = 'assets/imgs/avatar-blank.png';
    this.picture = null;
    this.loadData();
  }
  ionViewWillLeave(){
    this.profileImage = 'assets/imgs/avatar-blank.png';
    this.picture = null;
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response as UsuarioDTO;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
    .subscribe(response => {
      this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
      this.blobToDataURL(response).then(dataUrl => {
        let str:string = dataUrl as string;
        this.profileImage =this.sanitazer.bypassSecurityTrustUrl(str);
      })
    },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {
    this.apertouCamera = true;
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
     this.cameraOn = false;
    });
  }

  getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
     this.cameraOn = false;
    });
  }


  sendPicture() {
    let loading = this.presentLoadingDefault();
    this.apertouCamera = false;
    this.usuarioService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.profileImage = null;
        this.getImageIfExists();
        loading.dismiss();
        
      },
      error => {
      loading.dismiss();
      });

  }

  cancel() {
    this.picture = null;
    this.apertouCamera = false;
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Enviando Imagem...'
    });

    loading.present();
    return loading;

  }
}
