import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // @Output() contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  contactId: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }

  onNewContact(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
