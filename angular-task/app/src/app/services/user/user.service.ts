import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs'
import { environment } from '@environments/environment';
import { UserModel, UsersApiResponse } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiURL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(filter?: string, page?: number, pageSize?: number, sort?: string): Observable<UserModel[]> {
    let url = `${this.apiURL}?`;
    if (filter) url += `filter=${filter}&`;
    if (page) url += `page=${page}&`;
    if (pageSize) url += `pageSize=${pageSize}&`;
    if (sort) url += `sort=${sort}&`;
    return this.http.get<UsersApiResponse>(url).pipe(map((res: UsersApiResponse) => res.results));
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiURL}/${id}`);
  }

  updateUserFavorite(id: number, isFavorite: boolean): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiURL}/${id}/favorite`, { isFavorite });
  }
}
