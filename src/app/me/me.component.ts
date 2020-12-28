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
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileService.getProfile(parseInt(userId, 0)).then((value) => {
        const imageByte = value.profileImage.picByte;
        this.profile = value;
        this.profile.profileImage.picByte = 'data:image/jpeg;base64,' + imageByte;
      });
    }
  }

  enableEditting(): void {
    this.editting = true;
  }
}
