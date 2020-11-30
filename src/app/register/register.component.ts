import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm;
  register;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
    });
    this.register = authService.register();
  }

  ngOnInit(): void {
  }

  set onSubmit(event: any) {
    console.log(event);
  }
}
