import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit{

  documents: Document[] = [];

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  onNewDoc(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
