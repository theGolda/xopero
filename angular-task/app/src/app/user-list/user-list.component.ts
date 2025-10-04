import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
} from '@angular/material/table'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { setCurrentUser, loadUsers, connectWebSocket } from '@store/store.actions'
import { selectUsers } from '@store/store.selectors'
import { UserModel } from '@models/user.model'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    CommonModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
  ],
})
export class UserListComponent implements OnInit {
  users$: Observable<UserModel[]> = this.store.select(selectUsers);;

  constructor(
    public router: Router,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(connectWebSocket());
  }

  userDetails(user: UserModel) {
    this.store.dispatch(setCurrentUser({user}))
    this.router.navigate([user.id])
  }
}
