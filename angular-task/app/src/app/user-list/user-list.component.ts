import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table'
import { RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { loadUsers } from '@store/store.actions'
import { selectUsers, selectFavoriteUsers } from '@store/store.selectors'
import { UserModel } from '@models/user.model'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule
  ],
})
export class UserListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<UserModel>();
  users$: Observable<UserModel[]> = this.store.select(selectUsers);
  favoriteUsers$: Observable<UserModel[]> = this.store.select(selectFavoriteUsers);
  
  // Reactive form for filtering
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public store: Store,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchText: ['']
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.users$.pipe(
      tap(users => {
        this.dataSource.data = users;
        this.setupFiltering();
      })
    ).subscribe();

    // Subscribe to form changes for real-time filtering
    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setupFiltering(): void {
    this.dataSource.filterPredicate = (data: UserModel, filter: string) => {
      const searchText = this.searchForm.get('searchText')?.value?.toLowerCase() || '';
      
      if (!searchText) return true;
      
      const nameMatch = data.name?.toLowerCase().includes(searchText) || false;
      const roleMatch = data.role?.toLowerCase().includes(searchText) || false;
      const emailMatch = data.email?.toLowerCase().includes(searchText) || false;
      const projectsMatch = data.protectedProjects?.toString().includes(searchText) || false;
      
      return nameMatch || roleMatch || emailMatch || projectsMatch;
    };
  }

  applyFilter(): void {
    const searchText = this.searchForm.get('searchText')?.value || '';
    this.dataSource.filter = searchText.trim().toLowerCase();
  }

  isUserFavorite(userId: number, favoriteUsers: UserModel[] | null): boolean {
    if (!favoriteUsers) return false;
    return !!favoriteUsers.find(u => u.id === userId);
  }
}
