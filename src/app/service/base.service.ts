import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';

@Injectable({
    providedIn: 'root',
})
export class BaseService {

    // the base url.
    base_url: String = "http://localhost:8080";

    email = sessionStorage.getItem('email');
    password = sessionStorage.getItem('password');

    constructor(private http: HttpClient) {}

    async getApiCall(url: string) {
        try {
            return await this.http
                .get(this.base_url + url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Basic ' + btoa(`${this.email}:${this.password}`),
                    },
                })
                .toPromise();
        } catch (error) {
            console.error(error);
            return error;
        }

    }

    async deleteApiCall(url: string) {
        try {
            return await this.http
                .delete(this.base_url + url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Basic ' + btoa(`${this.email}:${this.password}`),
                    },
                })
                .toPromise();
        } catch (error) {
            console.error(error);
            return error;
        }

    }
}