import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { HeaderComponent } from './components/header/header.component';

import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailComponent } from './components/contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './components/contacts/contact-list/contact-item/contact-item.component';
import { ContactEditComponent } from './components/contacts/contact-edit/contact-edit.component';
import { ContactsFilterPipe } from './components/contacts/contacts-filter.pipe'

import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentItemComponent } from './components/documents/document-list/document-item/document-item.component';
import { DocumentListComponent } from './components/documents/document-list/document-list.component';
import { DocumentDetailComponent } from './components/documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './components/documents/document-edit/document-edit.component';

import { MessageListComponent } from './components/messages/message-list/message-list.component';
import { MessageItemComponent } from './components/messages/message-list/message-item/message-item.component';
import { MessageEditComponent } from './components/messages/message-edit/message-edit.component';

import { DropdownDirective } from './directives/dropdown.directive';
import { CloseDropDownsDirective } from './directives/close-drop-downs.directive';

import { DndModule } from 'ng2-dnd';
import { HttpClientModule } from "@angular/common/http"


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    DocumentsComponent,
    ContactItemComponent,
    ContactEditComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    DropdownDirective,
    CloseDropDownsDirective,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DndModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
