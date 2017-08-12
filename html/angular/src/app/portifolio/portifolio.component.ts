import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { PortifolioService } from "app/service/portifolio.service";
import { Portifolio } from "app/model/portifolio.model";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.css']
})
export class PortifolioComponent implements OnInit {
  modelo : Portifolio;
  portifolioSrv : PortifolioService;

  constructor(portifolioService: PortifolioService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
        
    this.toastr.setRootViewContainerRef(vcr);

    this.modelo = new Portifolio();    
    this.portifolioSrv = portifolioService;
    this.Listar();
  }

  ngOnInit() {
    //this.Listar();
  }

  public salvar(){
    this.mostrarMensagem(this.portifolioSrv.Cadastrar(this.modelo),"Cadastro com sucesso!");
  }

  public Listar() {
      this.modelo = this.portifolioSrv.Obter()[0];
  }

  mostrarMensagem(metodoRetorno: any, mensagem: string) {
        
        if (metodoRetorno.status == 500) {
            this.toastr.error(metodoRetorno.message);
        } else {
            this.toastr.success(mensagem);
        }
    }
}
