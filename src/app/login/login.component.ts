import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  loginForm;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  async onSubmit(formData: FormData) {
    const result = await this.authService.login(
      formData.email,
      formData.password
    );

    if (result === 'OK') {
      this.router.navigate(['me']);
      sessionStorage.setItem('email', formData.email);
      sessionStorage.setItem('password', formData.password);
    }
  }
}
