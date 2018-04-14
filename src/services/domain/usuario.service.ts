import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
        public global:Globals,
        public storageService:StorageService) {
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/usuarios/${id}`);
    }

    findAll(){
      return this.http.get(`${API_CONFIG.baseUrl}/usuarios`);
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : UsuarioDTO) {
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
        let formData : FormData = new FormData();
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

    preencherMenuDeAcordoComUsuario(){
      if(this.storageService.getLocalUser()){
        this.email = this.storageService.getLocalUser().email;
        this.findByEmail(this.email)
        .subscribe((response=>{
          this.perfis = response['perfis'];
          this.storageService.setUserPerfil(this.perfis)
          for(let i = 0; i<this.perfis.length;i++){
            let perfil = this.perfis[i];
            if(perfil==='ADMIN'){
              this.global.pages  = [
                {title:'Home',component:'HomePage'},
                { title: 'Meu Perfil', component: 'ProfilePage' },
                {title:'Meus Funcionarios',component:'FuncionariosPage'},
                {title:'Gráficos',component:'GraficosPage'},
                {title:'Cadastrar Novo Funcionário',component:'SignupPage'},
                {title:'Logout',component:''}
              ];
              break;
            }else{
              this.global.pages  = [
                {title:'Home',component:'HomePage'},
                { title: 'Meu Perfil', component: 'ProfilePage' },
                {title:'Gráficos',component:'GraficosPage'},
                {title:'Logout',component:''}
              ];
            }
          }
        }))

      }else{
        return null;
      }
      }
    }
