import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../../message.model';
import { MessageService } from '../../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit{
  @ViewChild('messageInput') msgText!: ElementRef;
  @ViewChild('subjectInput') subject!: ElementRef;
  @Output() sendMessageEvent = new EventEmitter<Message>;

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
    
  }

  onSendMessage(){
    if(!(this.subject.nativeElement.value == "" ||  this.msgText.nativeElement.value == "" )){
      let newMessage = new Message("3", this.subject.nativeElement.value, this.msgText.nativeElement.value, "3")
      this.messageService.addMessage(newMessage);
    
    }
    
  }

  onClear(subjectRef: HTMLInputElement, messageRef: HTMLInputElement){
    subjectRef.value = "";
    messageRef.value = "";

  }

}
