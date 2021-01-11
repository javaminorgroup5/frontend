import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {CommonService} from '../common.service';

interface FormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailAlert = false;
  passwordAlert = false;
  invalidEmail = false;
  loginForm;

  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router,
      private commonservice: CommonService
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {

  }

  checkUserValues(formData: FormData): boolean {
    this.emailAlert = false;
    this.passwordAlert = false;
    this.invalidEmail = false;

    if (!formData.email) {
      this.emailAlert = true;
      return false;
    }

    if (!this.commonservice.isValidaEmail(formData.email)) {
      this.invalidEmail = true;
      return false;
    }

    if (!formData.password) {
      this.passwordAlert = true;
      return false;
    }
    return true;
  }

  async onSubmit(formData: FormData): Promise<void> {

    if (!this.checkUserValues(formData)) {
      return;
    }

    try {
      const result = await this.authService.login(
          formData.email,
          formData.password
      );

      if (result) {
        this.router.navigate(['me']);
        sessionStorage.setItem('userId', result);
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('password', formData.password);
      }
    } catch (error) {
      console.error(error);
    }
  }

}

