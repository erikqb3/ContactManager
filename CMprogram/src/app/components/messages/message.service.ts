import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.module';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();

  private maxMessageId: number;
  private currentId: number;
  private messages: Message[] = [];
  public gottenMessage: Message;

    constructor() {
      this.messages = MOCKMESSAGES;
    }
    addMessage(newMessage: Message){
      if ((newMessage == null)||(newMessage == undefined)){
        return;
      }
      this.maxMessageId++;
      newMessage.id = this.maxMessageId.toString();
      this.messages.push(newMessage);
      this.messageChangedEvent.next(this.messages.slice());
     }
    getMaxId(): number {
      let maxId = 0;
  
      this.messages.forEach(message => {
        this.currentId = +message.id;
        if (this.currentId > maxId){
          maxId = this.currentId;
        }
      });
      return maxId;
    }
    getMessages():Message[] {
      return this.messages.slice();
    }
    getMessage(id: string): Message {
      this.messages.forEach(singleMessage => {
        // console.log(singleMessage);
        if (id == singleMessage.id){
          this.gottenMessage = singleMessage;
        }
      }
      );
      return this.gottenMessage;
    }
    updateMessage(originalMessage: Message, newMessage: Message){
      switch (originalMessage || newMessage){
        case null:
        case undefined:
          return;
      }
  
      let pos = this.messages.indexOf(originalMessage);
      if (pos < 0) {
        return;
      }
  
      newMessage.id = originalMessage.id;
      this.messages[pos] = newMessage;
      this.messageChangedEvent.next(this.messages.slice());
    }
    // addMessage(message: Message){
    //   this.messages.push(message);
    //   this.messageChangedEvent.next(this.messages.slice());
    // }
}
