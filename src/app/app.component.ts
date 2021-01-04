import {Component, OnInit} from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cookclub-frontend';

  constructor(private router: Router) {

  }

  loggedIn = false;

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('userId') !== ''){
      this.loggedIn = true;
    }
  }

  logout(): void {
    sessionStorage.setItem('userId', '');
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('password', '');
    this.router.navigate(['login']);
  }
}
