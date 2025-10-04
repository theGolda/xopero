import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource,
} from '@angular/material/table'
import { WebsocketService } from '@services/websocket.service'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { setCurrentUser } from '@store/store.actions'
import { UserModel } from '@models/user.model'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
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
  users: any

  private userSub!: Subscription;
  private wsSub!: Subscription;

  constructor(
    public userService: UserService,
    public websocketService: WebsocketService,
    public router: Router,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    this.wsSub = this.websocketService.connect(environment.websocketUrl).subscribe(msg => {
      console.log("New message:", msg);
    });
  }

  loadUsers() {
    this.userSub = this.userService.getUsers().subscribe(data => {
      this.users = new MatTableDataSource(data);
    });
  }

  userDetails(user: UserModel) {
    this.store.dispatch(setCurrentUser({user}))
    this.router.navigate([user.id])
  }
}
