import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { Subscription } from 'rxjs';
import { read } from 'fs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) docForm: NgForm;
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;
  subscription!: Subscription;

  constructor(private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params)=>{
        let id = +params['id'];
        if(!id){
          if(id === 0){

          }else{
            this.editMode = false;
            return;
          }
        
        }
        this.originalDocument = this.docService.getDocument(id);

        if(!this.originalDocument){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));

        let description = !this.document.description ? '' : this.document.description;
        
        setTimeout(() => {
          this.docForm.setValue({
            name: this.document.name,
            description: description,
            url: this.document.url
          });
        }, ); 
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editMode = false;
  }

  onSubmit(form: NgForm){
    let value = form.value;

    console.log(value);
    
    this.document = new Document('', value.name, value.description, value.url, null);

    if(this.editMode){
      this.docService.updateDocument(this.originalDocument, this.document);
    }else{
      this.docService.addDocument(this.document);
    }

    this.router.navigate(['/documents']); 
    
  }

  onCancel(){
    this.router.navigate(['/documents']); 
  }

}
