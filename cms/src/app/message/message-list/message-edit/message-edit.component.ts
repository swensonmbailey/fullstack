import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('messageInput') msgText!: ElementRef;
  @ViewChild('subjectInput') subject!: ElementRef;
  @Output() sendMessageEvent = new EventEmitter<Message>;

  onSendMessage(){
    if(!(this.subject.nativeElement.value == "" ||  this.msgText.nativeElement.value == "" )){
      let newMessage = new Message(4, this.subject.nativeElement.value, this.msgText.nativeElement.value, "Swenson")
      this.sendMessageEvent.emit(newMessage);
    
    }
    
  }

  onClear(subjectRef: HTMLInputElement, messageRef: HTMLInputElement){
    subjectRef.value = "";
    messageRef.value = "";

  }

}
