import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesChangedEvent = new EventEmitter<Message []>();

  private messages: Message[] = []
  maxId: number;

  constructor(private http: HttpClient, private contactSerivce: ContactService) { 
    // this.messages = MOCKMESSAGES;
  }

  getMessages(){
    this.http.get<Message[]>('https://contact-and-docs-default-rtdb.firebaseio.com/messages.json')
    .subscribe(  
      (messages: Message[]) =>{
        this.messages = messages;
        console.log(messages);
        this.maxId = this.getMaxId();

        this.messages.sort();
        this.messagesChangedEvent.next(this.messages.slice());

      },
      (error) =>{
        console.log(error); 
      }
    )
  }

  storeMessages(){

    

    this.http.put('https://contact-and-docs-default-rtdb.firebaseio.com/messages.json', JSON.stringify(this.messages),
      {
        headers: new HttpHeaders({'Content-Type': 'Json'})
      }
    ).subscribe(response =>{
      console.log(response);
      this.messagesChangedEvent.next(this.messages.slice());
    })
  }

  getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages){
      let currentId = +message.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
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
    this.storeMessages();
  }

  



}
