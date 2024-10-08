import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent { 
  contacts: Contact[] = [
    new Contact(1,  'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', "../../assets/images/jacksonk.jpg", null),
    new Contact(2,  'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', "../../assets/images/barzeer.jpg", null),
    new Contact(3,  'Harry Potter', 'fastBroom@byui.edu', '9&3/4', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLPODTQFvcf-4hkXhUiwnnhrvyUJyjPlChzQ&s", null)
  ];

  @Output() contactOutput = new EventEmitter<Contact>();

  onContactClick(contact: Contact){
    this.contactOutput.emit(contact);
  }

}
