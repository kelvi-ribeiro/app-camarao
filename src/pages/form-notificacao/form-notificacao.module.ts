import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormNotificacaoPage } from './form-notificacao';

@NgModule({
  declarations: [
    FormNotificacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormNotificacaoPage),
  ],
})
export class FormNotificacaoPageModule {}
