import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormTanquePage } from './form-tanque';

@NgModule({
  declarations: [
    FormTanquePage,
  ],
  imports: [
    IonicPageModule.forChild(FormTanquePage),
  ],
})
export class FormTanquePageModule {}
