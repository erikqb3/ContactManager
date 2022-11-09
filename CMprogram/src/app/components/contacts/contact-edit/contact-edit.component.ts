import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  originalContact: Contact;
  contact: Contact;
  subscript: Subscription;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  editItemIndex: string;

  constructor(
      private contactService: ContactService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.subscript = this.route.params
      .subscribe(
        (params: Params) => {
          this.editItemIndex = params['id'];
          if (this.editItemIndex == null || this.editItemIndex == undefined) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(this.editItemIndex);
          if (this.originalContact == null || this.originalContact == undefined) {return;}
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if (this.contact.group) {
           this.groupContacts == this.contact.group; 
          }
        }
      )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  };
  onRemoveItem(index: number){}
  onSubmit(form: NgForm){
    const value = form.value;
    const newContact = new Contact(this.contactService.getMaxId().toString(), value.name,value.email, value.phone, value.imageUrl,[]);
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      this.contactService.addContact(newContact);
    }
    this.editMode = false;
    form.reset();
    this.onCancel();

  }
}
