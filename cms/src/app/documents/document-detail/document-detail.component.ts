import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit{
  document!: Document;
  id!: number;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ){}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.document = this.documentService.getDocument(this.id);

        console.log(this.document.description);
      }
    )

    this.nativeWindow = this.windRefService.getNativeWindow();
  }


  onDocEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url);  
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
   

  
}
