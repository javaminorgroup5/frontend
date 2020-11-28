import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  async getUser(id?: number): Promise<Object> {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    return await this.http
      .get("http://localhost:8080/users/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${email}:${password}`),
        },
      })
      .toPromise();
  }
}
