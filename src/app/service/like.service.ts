import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../model/recipe';
import {Like} from '../model/Like';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  async getLikeByMessageId(messageId: number): Promise<any>  {
    const endpoint = `/likes/message/${messageId}`;
    return this.baseService.getApiCall(endpoint);
  }

  async toggleLike(like: Like): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/likes/message`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http
        .post<Recipe>(endpoint, like, { headers })
        .toPromise();
  }
}
