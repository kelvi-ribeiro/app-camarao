import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
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
  apertouOpcaoFoto = false;
  mandandoFoto = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public camera: Camera,
    public sanitazer:DomSanitizer,
    public toastCtrl:ToastController) {

  }

  ionViewDidEnter() {
    this.profileImage = 'assets/imgs/avatar-blank.png';
    this.picture = null;
    this.loadData();
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
    this.usuarioService.getImageFromBucket()
    .subscribe(response => {
      this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/${this.storage.getUserUrlFoto()}`;
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
    this.apertouOpcaoFoto = true;
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 65,
      targetWidth: 720,
      targetHeight: 720,
      correctOrientation:true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
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
    this.apertouOpcaoFoto = true; // Também servindo para foto
    const options: CameraOptions = {
      quality: 65,
      targetWidth: 720,
      targetHeight: 720,
      allowEdit: true,
      correctOrientation:true,
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
    this.presentToast('Fazendo upload, sua foto será alterada dentro de alguns segundos...','toast-attention');
    this.mandandoFoto = true;
    this.apertouOpcaoFoto = false;
    this.usuarioService.uploadPicture(this.picture)
      .subscribe(response => {
          this.navCtrl.setRoot('HomePage')
          this.navCtrl.setRoot('ProfilePage')
          this.presentToast('Foto Alterada',null)
      },
      error => {
        this.presentToast('Ocorreu Algum erro na tentiva de envio da foto, Desculpe, tente novamente','toast-error')
      });

  }

  cancel() {
    this.picture = null;
    this.apertouOpcaoFoto = false;
  }

  presentToast(message,css) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      cssClass:css
    });

    toast.present();
  }


}
