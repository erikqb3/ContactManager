import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/components/contacts/contact.model';
import { ContactService } from 'src/app/components/contacts/contact.service';
import { Message } from '../../message.module';
import { MessageService } from '../../message.service';


@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  messageSender: string;
  messages: Message [];

  constructor(
    private contactService: ContactService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) =>{
          this.messages = messages;
        }
      )
  }

}
