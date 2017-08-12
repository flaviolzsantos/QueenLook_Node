import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditorImagemComponent } from './editor-imagem/editor-imagem.component';
import { HomeModule } from "app/home/home.module";

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptor } from "app/HttpInterceptor";
import { HomeComponent } from './home/home.component';
import { PortifolioComponent } from './portifolio/portifolio.component';

import { HomeService } from "app/service/home.service";
import { PortifolioService } from "app/service/portifolio.service";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'portifolio', component: PortifolioComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PortifolioComponent
  ],
  imports: [
 RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      ),
      BrowserModule,
      FormsModule,
      HttpModule,
      HomeModule,
      BrowserAnimationsModule,
      ToastModule.forRoot()
  ],
  providers: [
      HomeService,
      HttpInterceptor,
      PortifolioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    

 }
