import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {

    
    private urlBase: string = "";

    constructor(private http: HttpClient){

    }

    public rotaApi (rota : string) : void{
        this.urlBase = environment.apiEndpoint + rota
    }

    public getAll<T>(): Observable<T> {
        let obj = this.http.get<T>(this.urlBase);   
        return obj;
    }

    public getSingle<T>(id: number): Observable<T> {
        return this.http.get<T>(this.urlBase + id);
    }

    public add<T>(item: T): Observable<T> {
        return this.http.post<T>(this.urlBase, item);
    }

    public update<T>(id: number, itemToUpdate?: any): Observable<T> {
        return this.http
            .put<T>(this.urlBase + id, JSON.stringify(itemToUpdate));
    }

    public delete<T>(id: number): Observable<T> {
        return this.http.delete<T>(this.urlBase + id);
    }

    public deleteComDoisParametros<T>(id: number, idFoto: number): Observable<T> {
        return this.http.delete<T>(this.urlBase + id + "/" + idFoto);
    }

    public postFile<T>(files: T) : Observable<T>{
        
        let headers = new Headers();
        let formData: FormData = new FormData();
        formData.append('files', files[0], files[0].name);
        return this.http.post<T>(environment.apiEndpoint + 'Admin/UploadFile',formData);

    }

}


