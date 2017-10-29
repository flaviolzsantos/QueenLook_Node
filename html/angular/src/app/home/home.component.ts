import { DataService } from './../service/data.service';
import { Component, OnInit, Input, ViewContainerRef, Output } from '@angular/core';
import { Home } from "app/model/home.model";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @Input()modelo: Home;
    @Input() teste;
    
    listaValores: any;
    constructor(public toastr: ToastsManager, 
        vcr: ViewContainerRef,
        private servico : DataService,
        private spinnerService: Ng4LoadingSpinnerService ) {
        
        this.toastr.setRootViewContainerRef(vcr);

        this.modelo = new Home();
        this.servico.rotaApi("Adm/Home/");
        
    }

    public cadastrar() {
        
        if(!this.ValidaCadastro())
         return;
         this.spinnerService.show();
         this.servico.add<Home>(this.modelo).subscribe(data => {
             
            this.mostrarSucesso(data);
             this.ListaValores();
             this.modelo.Titulo = "";
             this.modelo.Conteudo = "";
             this.modelo._id = "";          

            }, erro => this.mostrarErro(erro.error));
    }

    public DeletarHome(id, idFoto) {
        if (confirm("Tem certeza que deseja excluir esse item?")) {
            this.spinnerService.show();
            this.servico.deleteComDoisParametros<Home>(id, idFoto).subscribe(data => {
                this.mostrarSucesso(data);
                this.ListaValores();
            }, error => this.mostrarErro(error.error));            
        }
    }

    public ListaValores() {
        this.spinnerService.show();
        this.servico.getAll<Home[]>().subscribe((data : Home[])=>{ 
            this.listaValores = data;
            this.spinnerService.hide();
        },
        error => (erro) => this.mostrarErro(erro.error));
    }

    public AtivarOuDesativatItem(id) {     
        this.servico.rotaApi('Adm/Home/AtivaDesativa/');
        this.spinnerService.show();   
        this.servico.update<Home>(id).subscribe(data => {
            this.mostrarSucesso(data);
            this.servico.rotaApi("Adm/Home/");
            this.ListaValores();
        }, error => {
            this.mostrarErro(error.error);
            this.servico.rotaApi("Adm/Home/");
        })
               
    }

    public EditarItem(valor) {
        this.modelo = valor;
    }

   

    onChange(event) {
        this.spinnerService.show();
        this.servico.postFile(event.srcElement.files).subscribe(data => {
            this.modelo.Imagem = data.nomeArquivo;
            this.spinnerService.hide();
            this.modelo.Mudou = true;
        }, error => this.mostrarErro(error));
    }



    ngOnInit() {
        this.ListaValores();
    }


    private ValidaCadastro():boolean{
        
        if(this.modelo.Conteudo == ""){
            this.toastr.error("Conteúdo obrigatório");
            return false;
        }

        if(this.modelo.Titulo == ""){
            this.toastr.error("Título obrigatório");
            return false;
        }

        if(this.modelo.Imagem == ""){
            this.toastr.error("Escolha uma imagem");
            return false;
        }

        return true;
    }

    private mostrarErro(erro : string) : void{
        this.toastr.error(erro);
        this.spinnerService.hide();
    }
    private mostrarSucesso(mensagem) : void{
        this.toastr.success(mensagem.mensagem);
        this.spinnerService.hide();
    }

}
