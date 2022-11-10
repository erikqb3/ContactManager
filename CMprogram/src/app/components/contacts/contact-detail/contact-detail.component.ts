import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute
  ) {

   }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
          console.log(this.contact)
        }
      )
  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }
}
