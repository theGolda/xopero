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
import { RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { loadUsers } from '@store/store.actions'
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
    RouterModule,
  ],
})
export class UserListComponent implements OnInit {
  users$: Observable<UserModel[]> = this.store.select(selectUsers);;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }
}
