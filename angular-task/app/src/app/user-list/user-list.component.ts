import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table'
import { RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { loadUsers } from '@store/store.actions'
import { selectUsers } from '@store/store.selectors'
import { UserModel } from '@models/user.model'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatPaginator,
    MatSortModule
  ],
})
export class UserListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<UserModel>();
  users$: Observable<UserModel[]> = this.store.select(selectUsers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.users$.pipe(
      tap(users => {
        this.dataSource.data = users;
      })
    ).subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
