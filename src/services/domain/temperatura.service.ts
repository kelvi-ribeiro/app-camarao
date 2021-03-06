import { API_CONFIG } from "./../../config/api.config";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class TemperaturaService {
  constructor(public http: HttpClient) {}
  findTemperatura(): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/temperaturas`);
  }
  gerarTemperaturaForaDoPadrao(): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/temperaturas/generateOut`);
  }
  findPage(page, urlPropriedade): Observable<any> {
    return this.http.get(
      `${API_CONFIG.baseUrl}/${urlPropriedade}/paginada?page=${page}`
    );
  }
}
