import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  documentSelectedEvent = new EventEmitter<Document>();

  private documents: Document[] = [];


  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }
 
  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id: string){
    for(let x in this.documents){
      if(this.documents[x].id == id){
        return this.documents[x];
      }
    }
    return null;
  }



}
