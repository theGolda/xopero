import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { UserModel, UsersApiResponse } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _apiURL = `${environment.apiUrl}/users`;

  constructor(private _http: HttpClient) {}

  public getUsers(filter?: string, page?: number, pageSize?: number, sort?: string): Observable<UserModel[]> {
    let url = `${this._apiURL}?`;
    if (filter) url += `filter=${filter}&`;
    if (page) url += `page=${page}&`;
    if (pageSize) url += `pageSize=${pageSize}&`;
    if (sort) url += `sort=${sort}&`;
    return this._http.get<UsersApiResponse>(url).pipe(map((res: UsersApiResponse) => res.results));
  }

  public getUser(id: number): Observable<UserModel> {
    return this._http.get<UserModel>(`${this._apiURL}/${id}`);
  }

  public updateUserFavorite(id: number, isFavorite: boolean): Observable<UserModel> {
    return this._http.put<UserModel>(`${this._apiURL}/${id}/favorite`, { isFavorite });
  }
}
