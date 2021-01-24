import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient, private baseService: BaseService) { }

  async getGroups(): Promise<any> {
    return this.baseService.getApiCall("/group");
  }

  async deleteGroup(groupId?: number): Promise<any> {
    const userId = sessionStorage.getItem('userId') || '';

    return this.baseService.deleteApiCall(`/group/${groupId}/${userId}`);
  }

  async generateGroupInvite(groupId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const userId = sessionStorage.getItem('userId') || '';

    try {
      return await this.http
        .post(`http://localhost:8080/group/${groupId}/generate_invite`, { userId }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${email}:${password}`),
          },
        })
        .toPromise<any>();
    } catch (error) {
      return error;
    }
  }

  async joinGroup(groupId: number, inviteToken?: string): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const userId = sessionStorage.getItem('userId') || '';

    return await this.http
      .post(`http://localhost:8080/group/${groupId}/join`,
        {
          inviteToken,
          userId: parseInt(userId, undefined),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${email}:${password}`),
          },
        })
      .toPromise();
  }

  async enrollInGroup(groupId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const userId = sessionStorage.getItem('userId') || '';

    return await this.http
    .post(`http://localhost:8080/group/${groupId}/enroll`,
        {
         userId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${email}:${password}`),
          },
        })
      .toPromise();
  }

  async create(id: number, group: FormData): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/group/create/${id}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return await this.http
      .post(endpoint, group, { headers })
      .toPromise();
  }

  async getGroup(groupId: number): Promise<Group> {
    return this.baseService.getApiCall(`/group/${groupId}`);
  }

  async updateGroup(groupId: number, userId: number, group: FormData): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/group/${groupId}/user/${userId}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http
        .put<any>(endpoint, group, { headers })
        .subscribe(response => {
          console.log(response);
        });
  }

  async getEnrolledGroupsForUser(userId: number): Promise<any> {
    return this.baseService.getApiCall(`/users/${userId}/enrolled`);
  }
}
