import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  invalidLogin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  set onSubmit(event: any) {
    console.log(event);
  }

  register(): void {
    console.log(this.email, this.password);
    this.authService.register(this.email, this.password);
  }

}
