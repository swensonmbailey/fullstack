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

  getDocument(id: number){
    // for(let x in this.documents){
    //   if(this.documents[x].id == id){
    //     return this.documents[x];
    //   }
    // }
    // return null;
    return this.documents[id];
  }



}
