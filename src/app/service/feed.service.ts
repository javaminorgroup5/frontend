import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  async getFeedByGroup(groupId: number): Promise<any>  {
    const endpoint = `/group/${groupId}/feed`;
    return this.baseService.getApiCall(endpoint);
  }

  async getFeedByUser(userId: number): Promise<any>  {
    const endpoint = `/users/${userId}/feed`;
    return this.baseService.getApiCall(endpoint);
  }
}
