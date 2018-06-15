import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class MensagemService{

  constructor(public http:HttpClient){

  }
  findAll():Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}/mensagens`)
  }

  delete(id):Observable<any>{
    return this.http.delete(`${API_CONFIG.baseUrl}/mensagens/${id}`)
  }

  deleteAll():Observable<any>{    
    return this.http.delete(`${API_CONFIG.baseUrl}/mensagens/todos`)

  }

  insert(mensagem) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/mensagens`,
      mensagem,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
