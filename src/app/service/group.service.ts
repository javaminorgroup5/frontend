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
    const userId = sessionStorage.getItem('userId') || '';
    const endpoint = `/group/${groupId}/generate_invite`;

    return this.baseService.postApiCall(endpoint, { userId });
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
    return this.baseService.getApiCall(`/group/${groupId}`);
  }

  async updateGroup(groupId: number, userId: number, group: FormData): Promise<any> {
    const endpoint = `/group/${groupId}/user/${userId}`;

    return this.baseService.putApiCall(endpoint, group);
  }

  async getEnrolledGroupsForUser(userId: number): Promise<any> {
    return this.baseService.getApiCall(`/users/${userId}/enrolled`);
  }

}
