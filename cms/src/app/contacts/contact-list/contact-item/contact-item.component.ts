import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent implements OnInit{
  @Input() displayedContact!: Contact;
  @Input() index!: number;
  @Input() groupMemberContact = false;
  

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private contactService: ContactService
  ){}

  ngOnInit(): void {
    
  }

  onLinkClick(){

    if(this.groupMemberContact){
      if(this.index >= 0){
        this.router.navigate(['/contacts', this.index]);
      }else{
        this.router.navigate(['/contacts']);
      }
    }
    
    
  }


}
