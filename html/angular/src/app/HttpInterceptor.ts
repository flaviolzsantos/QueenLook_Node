﻿import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';

import { environment } from '../environments/environment';
import { RequestOptionsArgs } from "@angular/http/http";


@Injectable()
export class HttpInterceptor {

    public toastr: ToastsManager;

    constructor() {
    }

    
    get(url: string, options?: any) {
        
        var retorno = $.ajax(
            {
                type: "GET",
                url: this.getFullUrl(url),
                dataType: "json",
                async: false
            });

        return retorno.responseJSON;        
    }

    post(url: string, options?: any) {
        return $.ajax(
            {
                type: "POST",
                url: this.getFullUrl(url),
                data: this.requestOptions(options),
                dataType: "json",
                async: false
            });

    }

    

    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: any): any {
        //if (options == null) {
        //    options = {};
        //}
        //if (options.headers == null) {
        //    options.headers = {
        //        'Authorization': `Basic ${environment.basic_auth_token}`,
        //        'X-Auth-Token': localStorage.getItem('access_token'),
        //        'Content-Type': 'application/json'
        //    };
        //}
        return options;
    }
        
    private getFullUrl(url: string): string {
        return environment.apiEndpoint + url;
    }
    
    private beforeRequest(): void {
        //this.notifyService.showPreloader();
        console.log("Inicio");
    }

    /**
     * After any request.
     */
    private afterRequest(): void {
        //this.notifyService.hidePreloader();
        console.log("Fim");
    }

    

    /**
     * onSuccess
     * @param res
     */
    private onSuccess(res: Response): void {
        console.log(res);
    }

    /**
     * onError
     * @param error
     */
    private onError(request, status, erro): void {
        this.toastr.error(erro);
    }

    /**
     * onFinally
     */
    private onFinally(): void {
        this.afterRequest();
    }
}