import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { loadUsers } from '@store/store.actions';
import { selectUsers } from '@store/store.selectors';
import { UserModel } from '@models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTable,
    MatTableModule,
    MatPaginator,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    TranslateModule
  ],
})
export class UserListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<UserModel>();
  public users$: Observable<UserModel[]> = this._store.select(selectUsers);
  public searchForm: FormGroup;

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  constructor(
    private _store: Store,
    private _fb: FormBuilder
  ) {
    this.searchForm = this._fb.group({
      searchText: ['']
    });
  }

  public ngOnInit(): void {
    this._store.dispatch(loadUsers());
    this.users$.pipe(
      tap(users => {
        this.dataSource.data = users;
        this.setupFiltering();
      })
    ).subscribe();

    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setupFiltering(): void {
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

  private applyFilter(): void {
    const searchText = this.searchForm.get('searchText')?.value || '';
    this.dataSource.filter = searchText.trim().toLowerCase();
  }
}
