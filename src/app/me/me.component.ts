import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  profile: any;
  editting = false;

  constructor(
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileService.getUser(parseInt(userId, undefined)).then((value) => {
        this.profile = value;
      });
    }
  }

  enableEditting(): void {
    this.editting = true;
  }
}
