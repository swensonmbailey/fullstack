import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {

  @Input() document = new Document(-1, '', '', '', null);
  
  
}
 