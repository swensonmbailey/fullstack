import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit { 
  contacts: Contact[] = [];

  

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

  }


  onNewContact(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
