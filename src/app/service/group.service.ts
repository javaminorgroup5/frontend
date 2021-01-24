import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) { }

  async getGroups(): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    return await this.http
      .get(`http://localhost:8080/group`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${email}:${password}`),
        },
      })
      .toPromise();
  }

  async deleteGroup(groupId?: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const userId = sessionStorage.getItem('userId') || '';

    return await this.http
      .delete(`http://localhost:8080/group/${groupId}/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${email}:${password}`),
        },
      })
      .toPromise();
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

  async sendGeneratedGroupInviteToFeed(groupId: number, invitedUserId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const userId = sessionStorage.getItem('userId') || '';

    try {
      return await this.http
          .post(`http://localhost:8080/group/${groupId}/generate_feed_invite/${invitedUserId}`, { userId }, {
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
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    return await this.http
      .get<Group>(`http://localhost:8080/group/${groupId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${email}:${password}`),
        },
      })
      .toPromise();
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
      .toPromise();
  }

  async getEnrolledGroupsForUser(userId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/users/${userId}/enrolled`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http.get<any>(endpoint, { headers }).toPromise();
  }
}
