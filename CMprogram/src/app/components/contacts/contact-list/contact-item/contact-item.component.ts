import { outputAst } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.contact)
  }
}
