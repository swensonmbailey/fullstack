import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>(); 

  private documents: Document[] = [];


  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }
 
  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id: number){
    // for(let x in this.documents){
    //   if(this.documents[x].id == id){
    //     return this.documents[x];
    //   }
    // }
    // return null;
    return this.documents[id];
  }


  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }


}
