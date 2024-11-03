import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  maxId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
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

  
  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts){
      let currentId = +contact.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  addcontact(contact: Contact){
    if(!contact){
      return;
    }
    this.maxId++;
    contact.id = this.maxId.toString();
    this.contacts.push(contact);
    
    let contactsClone = this.contacts.slice();

    this.contactsChangedEvent.next(contactsClone);

  }

  updatecontact(originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return;
    }

    let index = this.contacts.indexOf(originalContact);
    if(index < 0){
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[index] = newContact;

    let contactsClone = this.contacts.slice();

    this.contactsChangedEvent.next(contactsClone);

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
    this.contactsChangedEvent.next(this.contacts.slice());
  }
   
 
  

}
