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
    const endpoint = `/group`;

    return this.baseService.getApiCall(endpoint);
  }

  async deleteGroup(groupId?: number): Promise<any> {
    const userId = sessionStorage.getItem('userId') || '';
    const endpoint = `/group/${groupId}/${userId}`;

    return this.baseService.deleteApiCall(endpoint);
  }

  async generateGroupInvite(groupId: number): Promise<any> {
    const userId = sessionStorage.getItem('userId') || '';
    const endpoint = `/group/${groupId}/generate_invite`;

    return this.baseService.postApiCall(endpoint, {
        userId
    });
  }

  async sendGeneratedGroupInviteToFeed(groupId: number, invitedUserId: number): Promise<any> {
    const userId = sessionStorage.getItem('userId') || '';
    const endpoint = `/group/${groupId}/generate_feed_invite/${invitedUserId}`;

    return this.baseService.postApiCall(endpoint, {
        userId
    });
  }

  async joinGroup(groupId: number, inviteToken?: string): Promise<any> {
    const userId = sessionStorage.getItem('userId') || '';
    const endpoint = `/group/${groupId}/join`;

    return this.baseService.postApiCall(endpoint, {
      inviteToken,
      userId: parseInt(userId, undefined),
    });
  }

  async enrollInGroup(groupId: number): Promise<any> {
    const userId = sessionStorage.getItem('userId') || '';
    const endpoint = `/group/${groupId}/enroll`;

    return this.baseService.postApiCall(endpoint, {
      userId
    });
  }

  async create(id: number, group: FormData): Promise<any> {
    const endpoint = `/group/create/${id}`;
    return this.baseService.postApiCall(endpoint, group);
  }

  async getGroup(groupId: number): Promise<Group> {
    const endpoint = `/group/${groupId}`;
    return this.baseService.getApiCall(endpoint);
  }

  async updateGroup(groupId: number, userId: number, group: FormData): Promise<any> {
    const endpoint = `/group/${groupId}/user/${userId}`;
    return this.baseService.putApiCall(endpoint, group);
  }

  async getEnrolledGroupsForUser(userId: number): Promise<any> {
    const endpoint = `/users/${userId}/enrolled`;
    return this.baseService.getApiCall(endpoint);
  }


  async getEnrolledUsersForGroup(groupId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    return await this.http
    .get<any>(`http://localhost:8080/group/${groupId}/enrolled`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' +btoa(`${email}:${password}`),
      },
    })
    .toPromise();
  }

