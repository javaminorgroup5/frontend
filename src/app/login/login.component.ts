import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {CommonService} from '../service/common.service';

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
  error: string | undefined;

  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router,
      private commonService: CommonService
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

    if (!this.commonService.isValidaEmail(formData.email)) {
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
        window.location.href = '/me';
        sessionStorage.setItem('userId', result);
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('password', formData.password);
      }
    } catch (error) {
      this.error = 'Uw email en of password is niet correct.';
      console.error(error);
    }
  }

}

