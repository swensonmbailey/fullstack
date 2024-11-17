import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{

  documents: Document[] = [];
  private subscription!: Subscription

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit(): void {
    
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (docs: Document[]) => {
        this.documents = docs;
        console.log(docs);
      }
    );

    this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewDoc(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
