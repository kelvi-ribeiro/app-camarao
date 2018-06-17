import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciaTanquesPage } from './gerencia-tanques';

@NgModule({
  declarations: [
    GerenciaTanquesPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciaTanquesPage),
  ],
})
export class GerenciaTanquesPageModule {}
