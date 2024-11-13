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

  getIndex(id: string){
    
    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i];
      if (contact.id == id){
        return i;
      }
    }
    return -1;
  }

  getGroups(){
    let groupIndexes: string [] = ['18', '14', "10", '6', '4'];

    let groups: Contact [] = [];

    for(let contact of this.contacts){
      if(groupIndexes.includes(contact.id)){
        groups.push(contact);
      }
    }
    return groups;
    
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


  manageGroups(groupContacts:any, contact: Contact){
    //delete the contact from all groups
    for(let x = 0; x < this.contacts.length; x++){

      if(!(!this.contacts[x].group)){
        for(let j = 0; j < this.contacts[x].group!.length; j++){
          if(this.contacts[x].group![j].id == contact.id){
            this.contacts[x].group!.splice(j, 1);
          }
        }
      }
      
    


    }
    //add the contact to the right groups
    for(let i = 0; i < groupContacts.length; i++){
      let groupContact = groupContacts[i][1];
      for(let x = 0; x < this.contacts.length; x++){
        let con = this.contacts[x];
        if(con.id == groupContact.id){
          let updated = false;
          for(let z = 0; z < this.contacts[x].group!.length; z++){
            if(this.contacts[x].group![z].id == contact.id){
              this.contacts[x].group![z] = contact;
              updated = true;
            }
          }
          if(!updated){
            this.contacts[x].group!.push(contact);
          }

          }
      }

    }

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
