import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ProfileService} from './service/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cookclub-frontend';

  constructor(private router: Router,
              private profileService: ProfileService) {

  }

  loggedIn = false;
  isAdmin = false;

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('userId') !== ''){
      this.loggedIn = true;
    }
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileService.getProfile(parseInt(userId, 0)).then((value) => {
        if (value.userRole === 'ADMIN') {
          this.isAdmin = true;
        }
      });
    }
  }

  logout(): void {
    sessionStorage.setItem('userId', '');
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('password', '');
    this.router.navigate(['login']);
  }
}
