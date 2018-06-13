import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../../globals.array';

/**
 * Generated class for the FormTanquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-tanque',
  templateUrl: 'form-tanque.html',
})
export class FormTanquePage {
  formGroup: FormGroup;
  usuarioId;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public globals:Globals) {

          this.usuarioId = this.globals.usuario.id
          this.formGroup = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            latitude: [],
            longetude: [],
            clienteId:[this.usuarioId]
          });
  }
}
