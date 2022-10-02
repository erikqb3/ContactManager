import { Component, OnInit } from '@angular/core';
import { Message } from '../message.module'

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  
  messageArr: Message[] = [
    new Message(1,new Date,"Message 1", "Sup bro.! This is a test message","Me"),
    new Message(2,new Date, "Message 2","Wuzzup my homie! This is another test Text! haha","You"),
    new Message(3,new Date, "Message 3","Hey Homeslices! I want in on this test stuff","That Guy")
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messageArr.push(message);
  }
}
