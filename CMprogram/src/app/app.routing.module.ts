import { ContactsComponent } from "./components/contacts/contacts.component";
import { DocumentsComponent } from "./components/documents/documents.component";
import { MessageListComponent } from "./components/messages/message-list/message-list.component";
import { MessageResolverService } from "./components/messages/message-resolver.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocumentEditComponent } from "./components/documents/document-edit/document-edit.component";
import { DocumentDetailComponent } from "./components/documents/document-detail/document-detail.component";
import { ContactDetailComponent } from "./components/contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./components/contacts/contact-edit/contact-edit.component";


const appRoutes: Routes = [
  { path: '', redirectTo:'/documents', pathMatch: "full"},
  { path: 'documents', component: DocumentsComponent, children: [
    { path: 'new', component: DocumentEditComponent},
    { path: ':id', component: DocumentDetailComponent},
    { path: ':id/edit', component:DocumentEditComponent}
  ]},
  { path: 'messages', 
    component: MessageListComponent,
    resolve: [MessageResolverService]
  },
  { path: 'contacts', component: ContactsComponent, children: [
    { path: 'new', component: ContactEditComponent},
    { path: ':id', component: ContactDetailComponent},
    { path: ':id/edit', component: ContactEditComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
