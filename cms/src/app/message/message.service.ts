import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesChangedEvent = new EventEmitter<Message []>();

  private messages: Message[] = []

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    return this.messages.slice();
  }

  getMessage(id: string){
    for(let x in this.messages){
      if(this.messages[x].id == id){
        return this.messages[x];
      }
    }
    return null;
  }


  addMessage(message: Message){
    this.messages.push(message);
    this.messagesChangedEvent.emit(this.messages.slice());
  }

  



}
