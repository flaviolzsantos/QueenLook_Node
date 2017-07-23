import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr/src/toast-manager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    'assets/css/bootstrap.css',
    'assets/css/font-awesome.css',
    'assets/css/custom.css',
    'assets/css/croppic.css'
    ]
})
export class AppComponent {
  title = 'Teste';
  testeDeInput: string = "asaaaaaa"

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {

      this.toastr.setRootViewContainerRef(vcr);

  }
}
