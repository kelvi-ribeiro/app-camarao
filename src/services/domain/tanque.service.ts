import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class TanqueService{

  constructor(public http:HttpClient){

  }
  findAll():Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}/tanques`)
  }

  delete(id):Observable<any>{
    return this.http.delete(`${API_CONFIG.baseUrl}/tanques/${id}`)
  }

  insert(tanque) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/tanques`,
      tanque,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  buscarEndereco(latitude,longitude):Observable<any>{
    return this.http.get(`${API_CONFIG.urlGeolocation}latlng=${latitude},${longitude}&key=${API_CONFIG.apiKeyGeolocation}`)

  }
}
