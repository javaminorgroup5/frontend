import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BaseService {

    // the base url.
    base_url: String = "http://localhost:8080";

    email = sessionStorage.getItem('email');
    password = sessionStorage.getItem('password');

    authorization = 'Basic ' + btoa(`${this.email}:${this.password}`);

    constructor(private http: HttpClient) {}

    async getApiCall(endpoint: string): Promise<any> {
        try {
            return await this.http
                .get(this.base_url + endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.authorization,
                    },
                })
                .toPromise();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async deleteApiCall(endpoint: string): Promise<any> {
        try {
            return await this.http
                .delete(this.base_url + endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.authorization,
                    },
                })
                .toPromise();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async postApiCall(endpoint: string, body: any): Promise<any> {
        try {
            return await this.http.post(
                this.base_url + endpoint,
                body,
                {
                    headers: {
                        Authorization: this.authorization,
                    },
                })
            .toPromise();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async putApiCall(endpoint: string, body: any): Promise<any> {
        try {
            return await this.http.put<any>(
                this.base_url + endpoint,
                body,
                {
                    headers: {
                        Authorization: this.authorization,
                    },
                })
                .toPromise();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}