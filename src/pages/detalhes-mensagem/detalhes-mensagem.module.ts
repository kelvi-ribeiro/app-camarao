import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesMensagemPage } from './detalhes-mensagem';

@NgModule({
  declarations: [
    DetalhesMensagemPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesMensagemPage),
  ],
})
export class DetalhesMensagemPageModule {}
