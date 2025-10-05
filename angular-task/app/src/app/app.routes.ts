import { Routes } from '@angular/router';
import { UserComponent } from '@user/user.component';
import { UserListComponent } from '@user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/:id',
    component: UserComponent,
  },
];
