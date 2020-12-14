import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


interface FormData {
  email: string;
  password: string;
  profileName: string;
  profilePicture: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      profileName: '',
      profilePicture: '',
    });
  }

  ngOnInit(): void {}

  async onSubmit(formData: FormData): Promise<void> {
    try {
      await this.authService.register(
        formData.email,
        formData.password,
        formData.profileName,
        formData.profilePicture
      );

      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
  }

}
