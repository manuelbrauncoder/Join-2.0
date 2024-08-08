import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
    { path: 'summary', component: SummaryComponent},
    { path: 'addTask', component: AddTaskComponent},
    { path: 'board', component: BoardComponent},
    { path: 'contacts', component: ContactsComponent}
];
