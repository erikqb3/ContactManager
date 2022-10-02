import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from "../message.module";


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss']
})
export class MessageEditComponent implements OnInit {
  @ViewChild("subject") subjectInputRef: ElementRef;
  @ViewChild("msgText") msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>(); 
  // @Output() editsCleared_EE = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const sender = "User";
    const date = new Date();
    const newMessage = new Message(0,date,subject,msgText,sender);
    console.log(date.getTime())
    if ((subject) && (msgText)){
      this.addMessageEvent.emit(newMessage);
    }
    else {
      alert("Write a message with a subject!");
    }
    this.onClear();
  }
  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
