import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  profile: any;
  editing = false;
  isAdmin = false;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileService.getProfile(parseInt(userId, 0)).then((value) => {
        const imageByte = value.image.picByte;
        this.profile = value;
        this.profile.image.picByte = 'data:image/jpeg;base64,' + imageByte;
        if (value.userRole === 'ADMIN') {
          this.isAdmin = true;
        }
      });
    }
  }

  enableEditing(): void {
    this.editing = true;
  }
}
