import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { PortifolioService } from "app/service/portifolio.service";
import { Portifolio } from "app/model/portifolio.model";
import {PortifolioItem} from "app/model/portifolioItem.model";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.css']
})
export class PortifolioComponent implements OnInit {
  modeloPortifolio : Portifolio;
  modeloPortifolioItem : PortifolioItem;
  portifolioSrv : PortifolioService;
  urlApi : string = environment.apiEndpoint + "cadastrarItemPortifolio";

  constructor(portifolioService: PortifolioService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
        
    this.toastr.setRootViewContainerRef(vcr);

    this.modeloPortifolio = new Portifolio();
    this.modeloPortifolioItem = new PortifolioItem();
    this.portifolioSrv = portifolioService;
  }

  
  onChange(event) {
        let files = event.srcElement.files;
        this.modeloPortifolioItem.Imagem = this.portifolioSrv.PostWithFile(files).nomeArquivo;
    }

  ngOnInit() {
    this.Listar();
  }

  public salvar(){
    this.mostrarMensagem(this.portifolioSrv.Cadastrar(this.modeloPortifolio),"Cadastro com sucesso!");
  }

  public adicionarItem(){
    this.mostrarMensagem(this.portifolioSrv.CadastrarItem(this.modeloPortifolioItem),"Cadastro com sucesso!");
  }

  public Listar() {
    let listaPortifolio = this.portifolioSrv.Obter();
    if(listaPortifolio != undefined)
      this.modeloPortifolio = listaPortifolio;
  }

  mostrarMensagem(metodoRetorno: any, mensagem: string) {
        
        if (metodoRetorno.status == 500) {
            this.toastr.error(metodoRetorno.message);
        } else {
            this.toastr.success(mensagem);
        }
    }
}
