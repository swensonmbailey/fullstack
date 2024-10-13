import { Component } from '@angular/core';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {

  selectedDoc: any;

  onSelected(document: Document){
    this.selectedDoc = document;
  }

}
