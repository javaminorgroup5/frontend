import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  profile: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUser(1).then((value) => {
      this.profile = value;
    });
  }
}
