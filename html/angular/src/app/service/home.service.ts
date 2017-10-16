import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Home } from "app/model/home.model";
import {Headers } from "@angular/http";
import * as $ from 'jquery';
import { HttpInterceptor } from "app/HttpInterceptor";

@Injectable()
export class HomeService {

    
    
    constructor(public http: HttpInterceptor, private _dataService : DataService) {
    
    }

    ObterHome(){
        return this._dataService.getAll<Home>();
    }

       
    CadastrarInfo(modelo: Home) {
        return this.http.post("Admin/Home/CadastrarHome", modelo);
    }

    GetInfo() {
        return this.http.get('Admin/Home/ObterListaHome');       
    }

    DeletarHome(id) {  
        return this.http.delete('Admin/Home/Deletar', {id : id} );
    }

    AtivarOuDeletar(id) {
        return this.http.post('Admin/Home/AtivarOuDesativar', { id: id });
    }

    postWithFile( files: File[]) {
        
        let headers = new Headers();
        let formData: FormData = new FormData();
        formData.append('files', files[0], files[0].name);

        return this.http.postWithFile('Admin/UploadFile', formData);
    }

}
