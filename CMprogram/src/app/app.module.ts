import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailComponent } from './components/contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ContactItemComponent } from './components/contacts/contact-list/contact-item/contact-item.component';
import { MessageListComponent } from './components/messages/message-list/message-list.component';
import { MessageItemComponent } from './components/messages/message-list/message-item/message-item.component';
import { MessageEditComponent } from './components/messages/message-edit/message-edit.component';
import { DocumentListComponent } from './components/documents/document-list/document-list.component';
import { DocumentItemComponent } from './components/documents/document-list/document-item/document-item.component';
import { DocumentDetailComponent } from './components/documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './components/documents/document-edit/document-edit.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { CloseDropDownsDirective } from './directives/close-drop-downs.directive';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    DocumentsComponent,
    ContactItemComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    DropdownDirective,
    CloseDropDownsDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
