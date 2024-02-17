import { EventEmitter, Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: 'root'
})

export class ContactService{
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];

  constructor() {
    // this.contacts = MOCKCONTACTS;
    this.contacts = this.sortContacts(MOCKCONTACTS);
  }

  getContacts(){
    return this.contacts.slice();
  }

  getContact(id: string): Contact{
    for(let contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      window.alert('Contact not found - deletion unsuccessfull!');
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      window.alert('Contact not found - deletion unsuccessfull!');
      return;
    }
    this.contacts.splice(pos, 1);
    window.alert(contact.name + ' contact successfully deleted.');
    // window.alert('Contact deleted successfully!');
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  // Version 3: Sort contacts by name
  private sortContacts(contacts: Contact[]): Contact[] {
    const groups = contacts.filter(contact => contact.group && contact.group.length > 0);
    const individuals = contacts.filter(contact => !contact.group);

    const sortedGroups = groups.sort((a, b) => a.name.localeCompare(b.name));
    let sortedContacts: Contact[] = [];

    const lastName = (name: string) => {
      const spaceIndex = name.indexOf(' ');
      return spaceIndex !== -1 ? name.substring(spaceIndex + 1) : name;
    };

    sortedGroups.forEach(group => {

      sortedContacts.push(group);
      const sortedMembers = group.group.sort((a, b) => lastName(a.name).localeCompare(lastName(b.name)));

      sortedMembers.forEach(member => {
        const memberDetail = contacts.find(contact => contact.id === member.id);
        if (memberDetail) {
          sortedContacts.push(memberDetail);
        }
      });
    });

    const sortedIndividuals = individuals.sort((a, b) => lastName(a.name).localeCompare(lastName(b.name)));

    sortedContacts = sortedContacts.concat(sortedIndividuals);

    return sortedContacts;
  }


}


