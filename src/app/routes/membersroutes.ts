import { Route, Routes } from '@angular/router';
import { MainContent } from '../layout/main-content/main-content';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Performance } from '../pages/performance/performance';
// import { Organization } from '../pages/organization/organization';
// import { Campaign } from '../pages/campaign/campaign';
// import { LeadBank } from '../pages/lead-bank/lead-bank';
// import { MailTemplates } from '../pages/mail-templates/mail-templates';
// import { Mailbox } from '../pages/mailbox/mailbox';

export const Member_Routes: Routes = [{
  path: '',
  component: MainContent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'performance', component: Performance },
    // { path: 'campaign', component: Campaign },
    // { path: 'lead-bank', component: LeadBank },
    // { path: 'mail-templates', component: MailTemplates },
    // { path: 'users', component: Users },
    // {
    //   path: 'organization',
    //   children: [
    //     { path: '', component: Organization },
    //     {
    //       path: ':id',
    //       component: OrganizationtDetailsComponent
    //     }
    //   ]
    // },
    // {
    //   path: 'mailbox',
    //   component: MailboxComponent,
    //   children: [
    //     {
    //       path: '',
    //       pathMatch: 'full',
    //       redirectTo: 'inbox/1',
    //     },
    //     {
    //       matcher: mailboxRouteMatcher,
    //       component: MailboxListComponent,
    //       runGuardsAndResolvers: mailboxRunGuardsAndResolvers,
    //       resolve: {
    //         mails: mailsResolver,
    //       },
    //       children: [
    //         {
    //           path: '',
    //           pathMatch: 'full',
    //           component: MailboxEmptyDetailsComponent,
    //         },
    //         {
    //           path: ':id',
    //           component: MailboxDetailsComponent,
    //           resolve: {
    //             mail: mailResolver,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    { path: '**', redirectTo: 'dashboard' }
  ]
}];