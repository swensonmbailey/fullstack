import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

  documents: Document[] = [
    new Document(1, 'Contract', 'New Client Contract', './documentStorage/contract', null),
    new Document(2, 'Spanish Contract', 'New Client Contract in Spanish', './documentStorage/spanishContract', null),
    new Document(3, 'Record Request', 'Medical Record Request', './documentStorage/recordRequest', null),
    new Document(4, 'Report Request', 'Police Report Request', './documentStorage/reportRequest', null)
  ]

  @Output() selectedDocEvent = new EventEmitter;

  onSelected(document: Document){
    this.selectedDocEvent.emit(document);
  }

}
