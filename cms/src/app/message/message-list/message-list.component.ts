import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  messages: Message[] = [
    new Message(1, "TEST NOT WORKING", "The test isn't accessible. I can't take the test. What do I do?", "Swenson"),
    new Message(2, "Is it working?", "I have made some changes on my end. Is it accessible now? Please let me know.", "R. Kent Jackson"),
    new Message(3, "Good job on the Quiz", "You got a 100% on our last quiz. You did a great job. Well done. Keep up the great work.", "Rex Barzee")
  ];

  onAddMessage(message: Message){
    this.messages.push(message);
    
  }


}
