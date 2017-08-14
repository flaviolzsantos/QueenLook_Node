import { Injectable } from '@angular/core';
import { Portifolio } from "app/model/portifolio.model";
import { PortifolioItem } from "app/model/portifolioItem.model";
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

    CadastrarItem(modelo: PortifolioItem){
        return this.http.post("Admin/Portifolio/CadastrarItem", modelo);
    }

    PostWithFile( files: File[]) {
                
        let headers = new Headers();
        let formData: FormData = new FormData();
        formData.append('files', files[0], files[0].name);

        return this.http.postWithFile('Admin/Portifolio/UploadFile', formData);
    }

}
