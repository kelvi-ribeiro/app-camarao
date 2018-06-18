import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { UsuarioDTO } from "../../models/usuario.dto";
import { Globals } from "../../globals.array";

@Injectable()
export class UsuarioService {
  perfis;
  email;
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService,
    public global: Globals,
    public storageService: StorageService,
    ) {
  }

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/usuarios/${id}`);
  }

  findAll() {
    return this.http.get(`${API_CONFIG.baseUrl}/usuarios`);
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
  }

  getImageFromBucket(): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/${this.storageService.getUserUrlFoto()}`
    return this.http.get(url, { responseType: 'blob' });
  }
  getImageFromBucketFromUsers(urlFoto): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/${urlFoto}`
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(obj: UsuarioDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/usuarios`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post(
      `${API_CONFIG.baseUrl}/usuarios/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  preencherMenuDeAcordoComUsuario() {
    if (this.storageService.getLocalUser()) {
      this.email = this.storageService.getLocalUser().email;
      this.findByEmail(this.email)
        .subscribe((response => {
          this.perfis = response['perfis'];
          this.global.perfis = response['perfis'];
          this.storageService.setUserUrlFoto(response['urlFoto'])
          this.storageService.setUserPerfil(this.perfis);
          this.storageService.setUserName(response['nome'])
          for (let i = 0; i < this.perfis.length; i++) {
            let perfil = this.perfis[i];
            if (perfil === 'ADMIN') {
              this.global.pages = [
                { title: 'Home', component: 'HomePage', icone: 'md-home' },
                { title: 'Meu Perfil', component: 'ProfilePage', icone: 'ios-contact' },
                { title: 'Localizar Tanques', component: 'MapaLocalizacaoTanquesPage', icone: 'pin' },
                { title: 'Criar Tanque', component: 'FormTanquePage', icone: 'water' },
                { title: 'Gerenciar Tanques', component: 'GerenciaTanquesPage', icone: 'hand' },
                { title: 'Meus Funcionarios', component: 'FuncionariosPage', icone: 'ios-people' },
                { title: 'Adicionar Funcionário', component: 'SignupPage', icone: 'md-person-add' },
                { title: 'Avisos', component: 'ListaMensagensPage', icone: 'md-chatbubbles' },
                { title: 'Relatório Completo', component: 'RelatorioCompletoPropriedadesPage', icone: 'list-box' },
                { title: 'Enviar Aviso', component: 'FormNotificacaoPage', icone: 'md-mail' },
                { title: 'Ajuda / Help', component: 'AjudaPage', icone: 'help-circle' },
                { title: 'Logout', component: '', icone: 'md-exit' }
              ];
              this.storageService.setUserFunction('Administrador')
              break;
            } else {
              this.global.pages = [
                { title: 'Home', component: 'HomePage', icone: 'md-home' },
                { title: 'Meu Perfil', component: 'ProfilePage', icone: 'ios-contact' },
                { title: 'Localizar Tanques', component: 'MapaLocalizacaoTanquesPage', icone: 'pin' },
                { title: 'Avisos', component: 'ListaMensagensPage', icone: 'md-chatbubbles' },
                { title: 'Relatório Completo', component: 'RelatorioCompletoPropriedadesPage', icone: 'list-box' },
                { title: 'Enviar Aviso', component: 'FormNotificacaoPage', icone: 'md-mail' },
                { title: 'Ajuda / Help', component: 'AjudaPage', icone: 'help-circle' },
                { title: 'Logout', component: '', icone: 'md-exit' }
              ]
              this.storageService.setUserFunction('Funcionário')
              }
            }
          }))

        }else{
          return null;
        }
      }

    }




