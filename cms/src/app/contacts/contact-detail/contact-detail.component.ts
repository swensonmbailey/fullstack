import { Component, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {

  contact!: Contact;
  id!: number;
  
  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    )
    

  }

  onEditContact(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  
  onDeleteContact(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  
}
