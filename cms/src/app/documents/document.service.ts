import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { machine } from 'os';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>(); 

  private documents: Document[] = [];
  maxDocumentId: number;


  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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


  getMaxId(): number {
    let maxId = 0;

    for (let doc of this.documents){
      let currentId = +doc.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(doc: Document){
    if(!doc){
      return;
    }
    this.maxDocumentId++;
    doc.id = this.maxDocumentId.toString();
    this.documents.push(doc);
    
    let docsClone = this.documents.slice();

    this.documentChangedEvent.next(docsClone);

  }

  updateDocument(originalDoc: Document, newDoc: Document){
    if(!originalDoc || !newDoc){
      return;
    }

    let index = this.documents.indexOf(originalDoc);
    if(index < 0){
      return;
    }

    newDoc.id = originalDoc.id;
    this.documents[index] = newDoc;

    let docsClone = this.documents.slice();

    this.documentChangedEvent.next(docsClone);

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
    this.documentChangedEvent.next(this.documents.slice());
  }


}
