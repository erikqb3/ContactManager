import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Injectable({providedIn: 'root'})
export class MessageResolverService implements Resolve<Message[]>{
  constructor(
    private messageService: MessageService) {
    }
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {
      return this.messageService.fetchMessages();
    
  }
}