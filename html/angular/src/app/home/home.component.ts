import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { HomeService } from "app/service/home.service";
import { Home } from "app/model/home.model";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    modelo: Home;
    homeSrv: HomeService;
    
    listaValores: any;
    constructor(homeService: HomeService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        
        this.toastr.setRootViewContainerRef(vcr);

        this.modelo = new Home();
        this.homeSrv = homeService;
    }

    public cadastrar() {
        //this.enviarImagem();
        this.mostrarMensagem(this.homeSrv.CadastrarInfo(this.modelo),"Cadastro com sucesso!");
        
        this.ListaValores();
        this.modelo.Titulo = "";
        this.modelo.Conteudo = "";
        this.modelo._id = "";
    }

    public DeletarHome(id) {
        if (confirm("Tem certeza que deseja excluir esse item?")) {
            this.mostrarMensagem(this.homeSrv.DeletarHome(id), "Deletado com sucesso!");
            this.ListaValores();
        }
    }

    public ListaValores() {
        this.listaValores = this.homeSrv.GetInfo();

    }

    public AtivarOuDesativatItem(id) {        
        var metodoRetorno = this.homeSrv.AtivarOuDeletar(id);

        if (metodoRetorno.status == 500) 
            this.toastr.error(metodoRetorno.message);       

        this.ListaValores();
    }

    public EditarItem(valor) {
        this.modelo = valor;
    }


    mostrarMensagem(metodoRetorno: any, mensagem: string) {
        
        if (metodoRetorno.status == 500) {
            this.toastr.error(metodoRetorno.message);
        } else {
            this.toastr.success(mensagem);
        }
    }

   

    onChange(event) {
        let file = event.srcElement.files;
        this.modelo.Imagem = this.homeSrv.postWithFile(file).nomeArquivo;
    }



    ngOnInit() {
        this.ListaValores();
    }

}
