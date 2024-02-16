import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSelected(contact: Contact){
    if (!contact.name.includes('team')) {
      // Emit the event or handle the click only if it is not a team header
      this.contactService.contactSelectedEvent.emit(contact);
    } else {
      // If it is a team header, clear the selected contact
      this.contactService.contactSelectedEvent.emit(null);
    }
  }
}
