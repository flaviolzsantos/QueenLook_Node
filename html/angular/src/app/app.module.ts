import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { EditorImagemComponent } from './editor-imagem/editor-imagem.component';
import { HomeModule } from "app/home/home.module";
import { HomeService } from "app/service/home.service";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptor } from "app/HttpInterceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      HomeModule,
      BrowserAnimationsModule,
      ToastModule.forRoot()
  ],
  providers: [
      HomeService,
      HttpInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    

 }
