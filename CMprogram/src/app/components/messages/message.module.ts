export class Message {
  public id: number;
  public date: Date;
  public subject: string;
  public msgText: string;
  public senderName: string; 
  
  constructor(id: number, date:Date, subject:string, msgText:string, senderName:string){
    this.id = id;
    this.date = date;
    this.subject = subject;
    this.msgText = msgText;
    this.senderName = senderName;
 } 
}