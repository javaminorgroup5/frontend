import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm;
  login;
  register;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: "",
      password: "",
    });
    this.login = authService.login();
    this.register = authService.register();
  }

  ngOnInit(): void {}

  onSubmit(event: any) {
    console.log(event)
  }
}
