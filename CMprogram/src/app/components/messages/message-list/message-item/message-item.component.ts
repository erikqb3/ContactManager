import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/components/contacts/contact.model';
import { ContactService } from 'src/app/components/contacts/contact.service';
import { Message } from '../../message.model';
import { MessageService } from '../../message.service';


@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  // messageChangedEvent_sub: Subscription;

  messageSender: string;


  constructor(
    private contactService: ContactService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(this.message);
    const contact: Contact = this.contactService.getContact(this.message.sender);
    console.log(contact);
    // console.log(this.message.sender, contact);
    this.messageSender = contact.name;
    // this.messageService.getMessages();
    // this.messageChangedEvent_sub = this.messageService.messageChangedEvent
    //   .subscribe(
    //     (messages: Message[]) =>{
    //       this.messages = messages;
    //     }
    //   )
  }

  // ngOnDestroy(): void {
  //   this.messageChangedEvent_sub.unsubscribe;
  // }

}
