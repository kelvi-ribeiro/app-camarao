import { UsuarioService } from './../services/domain/usuario.service';
import { Globals } from './../globals.array';
import { AuthService } from './../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { StorageService } from '../services/storage.service';
import { Push, PushOptions, PushObject } from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  email;
  perfis = [];
  profile;
  @ViewChild(Nav) nav: Nav;

  rootPage;
  constructor(
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public authService:AuthService,
              public globals:Globals,
              public storageService:StorageService,
              public alertCtrl:AlertController,
              public push:Push
            ) {


              this.pushsetup();
              this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.verificaUsuarioLogado();
    });
  }



  openPage(page:{title:string,component:string,icone:string}) {
    switch(page.title){
      case'Logout':

      this.authService.logout();

      this.nav.setRoot(LoginPage);
      break;
      default:
      this.nav.setRoot(page.component);

    }
  }
  verificaUsuarioLogado(){
    if(this.storageService.getLocalUser()){
      console.log(this.storageService.getLocalUser());

      this.rootPage = 'HomePage';
    }else{

      this.rootPage = LoginPage;
    }
  }
  pushsetup() {

    const options: PushOptions = {
      android: {
    icon: "notification",
    iconColor: "orange",
    sound: true,
    vibrate: true,
    forceShow: true
    },

   };

  const pushObject: PushObject = this.push.init(options);
  pushObject.on("registration").subscribe((registration: any) => {});

  pushObject.on("notification").subscribe((notification: any) => {

        let youralert = this.alertCtrl.create({

          title: notification.label,

          message: notification.message,
        });

    youralert.present();

    });

}

    }
