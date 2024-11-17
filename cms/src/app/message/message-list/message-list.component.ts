import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
  providers: [MessageService]
})
export class MessageListComponent implements OnInit{

  messages: Message[] = [];


  constructor(private messageService: MessageService,
    private contactService: ContactService
  ){
    
  }

  ngOnInit(): void {
    
    this.messageService.messagesChangedEvent
      .subscribe(
        (messages: Message []) => {
          this.messages = messages;
        }
      );

    this.messageService.getMessages();
  }
  

  onAddMessage(message: Message){
    this.contactService.getContacts();
    this.messageService.addMessage(message);
    
  }


}
