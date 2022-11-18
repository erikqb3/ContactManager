import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  messageChangedEvent_sub : Subscription;
  // addedMessage: Message;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // this.messages = this.messageService.getMessages();
    this.messageService.getMessages();
    this.messageChangedEvent_sub = this.messageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      )
  }
  ngOnDestroy(): void {
    this.messageChangedEvent_sub.unsubscribe;
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
