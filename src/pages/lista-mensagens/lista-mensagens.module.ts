import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaMensagensPage } from './lista-mensagens';

@NgModule({
  declarations: [
    ListaMensagensPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaMensagensPage),
  ],
})
export class ListaMensagensPageModule {}
