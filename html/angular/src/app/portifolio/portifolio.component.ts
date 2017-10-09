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
  listaDePortifolioItem : PortifolioItem[];
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
        this.modeloPortifolioItem.Mudou = true;
    }

  ngOnInit() {
    this.Listar();
    this.ListarItem();
  }

  public salvar(){
    this.mostrarMensagem(this.portifolioSrv.Cadastrar(this.modeloPortifolio),"Cadastro com sucesso!");
  }

  public adicionarItem(){
    //this.modeloPortifolioItem.Mudou = false;
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

  mostrarMensagem(metodoRetorno: any, mensagem: string) {
        
        if (metodoRetorno.status == 500) {
            this.toastr.error(metodoRetorno.message);
        } else {
            this.toastr.success(mensagem);
        }
    }
}
