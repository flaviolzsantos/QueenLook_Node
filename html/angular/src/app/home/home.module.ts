import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { EditorImagemComponent } from "app/editor-imagem/editor-imagem.component";

@NgModule({
  imports: [
    CommonModule    
  ],
  exports:[
    HomeComponent    
  ],
  declarations: [
    HomeComponent,
    EditorImagemComponent
  ]
})
export class HomeModule { }
