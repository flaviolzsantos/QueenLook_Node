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
        return this.http.get<T>(this.urlBase);
    }

    public getSingle<T>(id: number): Observable<T> {
        return this.http.get<T>(this.urlBase + id);
    }

    public add<T>(itemName: string): Observable<T> {
        const toAdd = JSON.stringify({ ItemName: itemName });

        return this.http.post<T>(this.urlBase, toAdd);
    }

    public update<T>(id: number, itemToUpdate: any): Observable<T> {
        return this.http
            .put<T>(this.urlBase + id, JSON.stringify(itemToUpdate));
    }

    public delete<T>(id: number): Observable<T> {
        return this.http.delete<T>(this.urlBase + id);
    }

}


