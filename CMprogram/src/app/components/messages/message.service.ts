import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.module';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  private messages: Message[] = [];
  public gottenMessage: Message;

    constructor() {
      this.messages = MOCKMESSAGES;
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

    addMessage(message: Message){
      this.messages.push(message);
      this.messageChangedEvent.emit(this.messages.slice());
    }
}
