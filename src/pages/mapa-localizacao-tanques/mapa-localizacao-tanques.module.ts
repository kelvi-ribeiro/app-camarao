import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaLocalizacaoTanquesPage } from './mapa-localizacao-tanques';

@NgModule({
  declarations: [
    MapaLocalizacaoTanquesPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaLocalizacaoTanquesPage),
  ],
})
export class MapaLocalizacaoTanquesPageModule {}
