import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { machine } from 'os';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>(); 

  private documents: Document[] = [];
  maxDocumentId: number;


  constructor(private http: HttpClient
  ) { 
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }
 
  getDocuments(){
    this.http.get<Document[]>('https://contact-and-docs-default-rtdb.firebaseio.com/documents.json')
    .subscribe(  
      (documents: Document[]) =>{
        this.documents = documents;
        console.log(documents);
        this.maxDocumentId = this.getMaxId();

        this.documents.sort();
        this.documentChangedEvent.next(this.documents.slice());

      },
      (error) =>{
        console.log(error); 
      }
    )
  }

  storeDocuments(){
    this.http.put('https://contact-and-docs-default-rtdb.firebaseio.com/documents.json', JSON.stringify(this.documents),
      {
        headers: new HttpHeaders({'Content-Type': 'Json'})
      }
    ).subscribe(response =>{
      console.log(response);
      this.documentChangedEvent.next(this.documents.slice());
    })
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
    
    this.storeDocuments();

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

    this.storeDocuments();

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
    this.storeDocuments();
  }


}
