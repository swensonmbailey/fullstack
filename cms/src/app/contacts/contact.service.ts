import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(){
    return this.contacts.slice();
  }

  getContact(id: number){
    // for(let x in this.contacts){
    //   if(this.contacts[x].id == id){
    //     return this.contacts[x];
    //   }
    // }
    // return null as any;
    return this.contacts[id];
  }

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactsChangedEvent.emit(this.contacts.slice());
  }
  
 
  

}
