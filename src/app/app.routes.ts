import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { JoinHelpComponent } from './join-help/join-help.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent},
    { path: 'login', component: LoginComponent},
    { path: 'summary', component: SummaryComponent},
    { path: 'addTask', component: AddTaskComponent},
    { path: 'board', component: BoardComponent},
    { path: 'contacts', component: ContactsComponent},
    { path: 'sign-up', component: SignUpComponent},
    { path: 'imprint', component: ImprintComponent},
    { path: 'privacy', component: PrivacyComponent},
    { path: 'help', component: JoinHelpComponent},
];
