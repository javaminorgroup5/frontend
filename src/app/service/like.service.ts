import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../model/recipe';
import {Like} from '../model/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  async getLikeByMessageId(messageId: number): Promise<any>  {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/likes/message/${messageId}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return await this.http
        .get<[]>(endpoint, { headers}).toPromise();
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
