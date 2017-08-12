import { Injectable } from '@angular/core';
import { Portifolio } from "app/model/portifolio.model";
import { Http, Headers, RequestOptions } from "@angular/http";
import * as $ from 'jquery';
import { HttpInterceptor } from "app/HttpInterceptor";

@Injectable()
export class PortifolioService {

  constructor(public http: HttpInterceptor) { }

    Cadastrar(modelo: Portifolio) {
        return this.http.post("Admin/Portifolio/Cadastrar", modelo);
    }

    Obter() {
        return this.http.get('Admin/Portifolio/ObterPortifolio');       
    }

}
