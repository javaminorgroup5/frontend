import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<Object> {
    return await this.http
      .get("http://localhost:8080/users/login", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${email}:${password}`),
        },
      })
      .toPromise();
  }

  register(): void {}
}
