import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{ 
  contacts: Contact[] = [];
  term: string;

  private subscription!: Subscription

  constructor(private contactService: ContactService, 
    private route: ActivatedRoute, 
    private router: Router
    ){

  }

  ngOnInit(): void {
    

    this.subscription = this.contactService.contactsChangedEvent.subscribe(
      (cons: Contact[]) => {
        this.contacts = cons;
      }
    );

    this.contactService.getContacts();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onNewContact(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  search(value: string){
    this.term = value;
  }

}
