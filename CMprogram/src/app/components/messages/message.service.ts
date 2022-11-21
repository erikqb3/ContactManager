import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Message } from './message.model';
import { Contact } from '../contacts/contact.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  fireBase_mess = "https://cms-project-c8a63-default-rtdb.firebaseio.com/messages.json"
  fireBase_contacts = "https://cms-project-c8a63-default-rtdb.firebaseio.com/contacts.json"

  private maxMessageId: number;
  private currentId: number;
  private messages: Message[] = [];
  private contacts: Contact[] = [];
  public gottenMessage: Message;
  public maxMessId: number;
  public gottenContact: Contact;

    constructor(
      private http: HttpClient
    ) {
      this.messages = [];
      this.contacts = []
      this.maxMessId = this.getMaxId();
    }
    addMessage(newMessage: Message){
      if ((newMessage == null)||(newMessage == undefined)){
        return;
      }
      this.maxMessageId++;
      newMessage.id = this.maxMessageId.toString();
      this.messages.push(newMessage);
      this.storeMessage();
     }

    fetchMessages(){
      return this.http
        .get<Message[]>(this.fireBase_mess)
          .pipe(
            map(messages => {
              return messages.map(message => {
                return {
                  ...message
                }
              });
            }),tap(messages => {
              this.setMessages(messages);
            })
          )
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
    getMessages(){
      this.http
        .get<Message[]>(this.fireBase_mess)
          .subscribe(
            (messages: Message[]) => {
              this.messages = messages;
              this.maxMessId = this.getMaxId();
              this.messageChangedEvent.next(this.messages.slice());
            }
          )
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

    setMessages(mesages: Message[]){
      this.messages = mesages;
      this.messageChangedEvent.next(this.messages.slice());

    }

    storeMessage(){
      const storedMessages = this.messages;
      this.http
        .put(this.fireBase_mess, storedMessages)
          .subscribe(response => {
            this.messageChangedEvent.next(this.messages.slice());
          })
        
    }
    // updateMessage(originalMessage: Message, newMessage: Message){
    //   switch (originalMessage || newMessage){
    //     case null:
    //     case undefined:
    //       return;
    //   }
  
    //   let pos = this.messages.indexOf(originalMessage);
    //   if (pos < 0) {
    //     return;
    //   }
  
    //   newMessage.id = originalMessage.id;
    //   this.messages[pos] = newMessage;
    //   this.storeMessage();
    // }


    // addMessage(message: Message){
    //   this.messages.push(message);
    //   this.messageChangedEvent.next(this.messages.slice());
    // }
}
