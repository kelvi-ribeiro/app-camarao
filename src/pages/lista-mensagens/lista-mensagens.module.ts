import { MensagemReduzidaPipe } from './../../pipes/mensagem-reduzida/mensagem-reduzida';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaMensagensPage } from './lista-mensagens';


@NgModule({
  declarations: [
    ListaMensagensPage,
    MensagemReduzidaPipe

  ],
  imports: [
    IonicPageModule.forChild(ListaMensagensPage),

  ],
})
export class ListaMensagensPageModule {}
