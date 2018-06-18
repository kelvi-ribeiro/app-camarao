import { HttpClient } from '@angular/common/http';
import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  formGroup: FormGroup;  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController,
    public http: HttpClient,
    public toastCtrl:ToastController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', []],
      bairro: ['', []],
      cep: ['', [Validators.required]],
      telefone1: ['', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }


  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      }, error => {

      });
  }
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;

        this.formGroup.controls.cidadeId.setValue(null);
      }, error => {

      })
  }
  signupUser() {
    this.usuarioService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('FuncionariosPage');
          }
        }
      ]
    });
    alert.present();
  }
  backHome() {
    this.navCtrl.setRoot('HomePage');

  }

  buscarViaCep() {
    this.http.get(`https://viacep.com.br/ws/${this.formGroup.value.cep}/json/`).subscribe(res => {      
      this.formGroup.controls.estadoId.setValue(this.estados.find(estado => estado['uf'] === res['uf']).id);
      this.cidadeService.findAll(this.formGroup.value.estadoId).subscribe(cidades => {          
          for (let cidade in cidades) {
            if (cidades[cidade].nome == res['localidade']) {
              this.formGroup.controls.cidadeId.setValue(cidades[cidade].id)
              this.cidades = []
              this.cidades[0] = cidades[cidade]
              this.exibirToastEnderecoEncontrado()
              break;        
          }
        }
      })

       this.formGroup.controls.bairro.setValue(res['bairro']);
       this.formGroup.controls.logradouro.setValue(res['logradouro']);
    },error=>this.exibirToastCepInvalido())
  }
  exibirToastCepInvalido() {
    let toast = this.toastCtrl.create({
      message: 'CEP Inválido',
      cssClass: "toast-error",
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

  exibirToastEnderecoEncontrado() {
    let toast = this.toastCtrl.create({
      message: 'Endereço Encontrado 😁',      
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}
