import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();

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

  

  

}
