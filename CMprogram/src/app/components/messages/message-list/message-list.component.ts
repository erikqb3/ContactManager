import { Component, OnInit } from '@angular/core';
import { Message } from '../message.module'
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  // addedMessage: Message;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // this.messages = this.messageService.getMessages();
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      )
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
