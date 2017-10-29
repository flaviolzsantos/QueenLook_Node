import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { PortifolioService } from "app/service/portifolio.service";
import { Portifolio } from "app/model/portifolio.model";
import {PortifolioItem} from "app/model/portifolioItem.model";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../environments/environment';
import { DataService } from './../service/data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.css']
})
export class PortifolioComponent implements OnInit {
  modeloPortifolio : Portifolio;
  modeloPortifolioItem : PortifolioItem;
  portifolioSrv : PortifolioService;
  listaDePortifolioItem : PortifolioItem[];

  constructor(portifolioService: PortifolioService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private servico : DataService,
              private spinnerService: Ng4LoadingSpinnerService) { 
        
    this.toastr.setRootViewContainerRef(vcr);

    this.modeloPortifolio = new Portifolio();
    this.modeloPortifolioItem = new PortifolioItem();
    this.portifolioSrv = portifolioService;
    this.servico.rotaApi("Adm/Portifolio/");
  }

  
  

  ngOnInit() {
    this.Listar();
    this.ListarItem();
  }

  public salvar(){
    this.mostrarMensagem(this.portifolioSrv.Cadastrar(this.modeloPortifolio),"Cadastro com sucesso!");
  }

  public adicionarItem(){
    this.mostrarMensagem(this.portifolioSrv.CadastrarItem(this.modeloPortifolioItem),"Cadastro com sucesso!");
    //this.modeloPortifolioItem.LimparDados();
    this.modeloPortifolioItem._id = "";
    this.modeloPortifolioItem.Titulo = "";
    this.modeloPortifolioItem.Conteudo = "";
    this.modeloPortifolioItem.Ativo = false;
    this.modeloPortifolioItem.Ordem = 0;
    this.modeloPortifolioItem.Imagem = "";
    this.ListarItem();
  }

  public Listar() {
    let listaPortifolio = this.portifolioSrv.Obter();
    if(listaPortifolio != undefined)
      this.modeloPortifolio = listaPortifolio;
  }

  public ListarItem(){
    this.listaDePortifolioItem = this.portifolioSrv.ObterItem();
  }
  public DeletarItemPortifolio(id) {
    if (confirm("Tem certeza que deseja excluir esse item?")) {
        this.mostrarMensagem(this.portifolioSrv.DeletarItemPortifolio(id), "Deletado com sucesso!");
        this.ListarItem();
    }
  }
  public EditarItem(valor) {
    this.modeloPortifolioItem = valor;
  }
  public AtivarOuDesativatItem(id){
    var metodoRetorno = this.portifolioSrv.AtivarOuDeletarItem(id);
    
    if (metodoRetorno.status == 500) 
        this.toastr.error(metodoRetorno.message);       

    this.ListarItem();

  }

  
  onChange(event) {
    this.spinnerService.show();
    this.servico.postFile(event.srcElement.files).subscribe(data => {
        this.modeloPortifolioItem.Imagem = data.nomeArquivo;
        this.spinnerService.hide();
        this.modeloPortifolioItem.Mudou = true;
    }, error => this.mostrarErro(error));
  }

  private mostrarErro(erro : string) : void{
    this.toastr.error(erro);
    this.spinnerService.hide();
  }
  private mostrarSucesso(mensagem) : void{
    this.toastr.success(mensagem.mensagem);
    this.spinnerService.hide();
  }


  mostrarMensagem(metodoRetorno: any, mensagem: string) {
        
        if (metodoRetorno.status == 500) {
            this.toastr.error(metodoRetorno.message);
        } else {
            this.toastr.success(mensagem);
        }
    }
}
